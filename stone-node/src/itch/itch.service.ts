import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import puppeteer from 'puppeteer';
import { Dashboard } from 'src/dashboard/entities/dashboard.entity';
import { StockLimitUp } from 'src/stock-limit-up/entities/stock-limit-up.entity';
import { FORMAT } from 'src/utils/constants';

// enum Board {
//   SSECI,
//   SZSE_CI,
//   GEM,
//   BSE,
//   SSE_CB,
// }

export interface BoardOverview {
  smdtrNumber: string; // 龙虎榜个数
}

@Injectable()
export class ItchService {
  constructor() {}

  async startPuppeteer() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.tencent.com');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type('.devsite-search-field', 'automate beyond recorder');

    // Wait and click on first result
    const searchResultSelector = '.devsite-result-item-link';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
      'text/Customize and automate',
    );
    const fullTitle = await textSelector?.evaluate((el) => el.textContent);

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
  }

  async initPuppeteer(pageLink: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(pageLink);

    await page.setViewport({ width: 1920, height: 1080 });
    return { page, browser };
  }

  percentToNumber(percentStr) {
    const numberStr = percentStr.replace('%', '');
    const number = Math.abs(parseFloat(numberStr));
    return number;
  }

  isTimeLessThan(timeStr1) {
    const lastAuctionTime = '09:30:00';

    const date1 = new Date('1970-01-01T' + timeStr1 + 'Z');
    const date2 = new Date('1970-01-01T' + lastAuctionTime + 'Z');
    return date1 < date2;
  }

  // 涨停跌停个数
  async crawlZtgcFromDashboard(ztgcCrawlInfo: any) {
    const { page, browser } = await this.initPuppeteer(ztgcCrawlInfo.page);

    try {
      await page.waitForSelector(ztgcCrawlInfo.onLoadSelector);
      const more = await page.$$(ztgcCrawlInfo.moreSelector);
      if (more) {
        await page.click(ztgcCrawlInfo.moreSelector);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      const allStocks = (await page.$$(ztgcCrawlInfo.allStockSelector)) as any;

      let count1 = 0;
      let count2 = 0;
      let count3 = 0;
      let countBeforeCallAuction = 0;
      let date = '';
      let allAmount = 0;

      for (let i = 0; i < allStocks.length; i++) {
        const stockInfo = await allStocks[i].$$('td');
        const stockUpValue = await stockInfo[3].evaluate((x) => x.textContent);
        const stockUpTime = await stockInfo[11].evaluate((x) => x.textContent);
        const fund = await stockInfo[9].evaluate((x) => x.textContent);

        const parsedStockUpValue = this.percentToNumber(stockUpValue);

        if (Number(parsedStockUpValue) <= 11) {
          count1++;
        } else if (
          Number(parsedStockUpValue) > 11 &&
          Number(parsedStockUpValue) <= 21
        ) {
          count2++;
        } else if (Number(parsedStockUpValue) > 29) {
          count3++;
        }

        if (this.isTimeLessThan(stockUpTime)) {
          countBeforeCallAuction++;
        }

        if (fund?.endsWith('亿')) {
          allAmount += parseFloat(fund);
        } else if (fund?.endsWith('万')) {
          allAmount += parseFloat(fund) / 10000;
        }
      }

      if (ztgcCrawlInfo.date) {
        const dateInput = (await page.$$(ztgcCrawlInfo.date)) as any;

        date = await dateInput?.[0]?.evaluate((x) => x.value);
      }

      await browser.close();

      return {
        date,
        count1,
        count2,
        count3,
        countBeforeCallAuction,
        allAmount,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async crawlDataFromDashboard() {
    const ztgcCrawlInfo = {
      page: 'https://quote.eastmoney.com/ztb/detail#type=ztgc',
      onLoadSelector: '#zrzttable tfoot',
      moreSelector: '#zrzttable tfoot td',
      allStockSelector: '#zrzttable tbody tr',
      date: '#beginDate',
    };

    const dtgcCrawlInfo = {
      page: 'https://quote.eastmoney.com/ztb/detail#type=dtgc',
      onLoadSelector: '#zrzttable tfoot',
      moreSelector: '#zrzttable tfoot td',
      allStockSelector: '#zrzttable tbody tr',
      date: '#beginDate',
    };

    const limitUpData = await this.crawlZtgcFromDashboard(ztgcCrawlInfo);
    const limitDownData = await this.crawlZtgcFromDashboard(dtgcCrawlInfo);

    return {
      date: limitUpData?.date,
      allAmount: limitUpData.allAmount,
      limitUp: limitUpData,
      limitDown: limitDownData,
    };
  }

  // 大盘
  async crawDataFromIndex() {
    const newDashboard = new Dashboard();
    const pageLink = `https://quote.eastmoney.com/center/hszs.html`;
    const { page, browser } = await this.initPuppeteer(pageLink);

    try {
      const indexTable = await page.waitForSelector(
        '#hszs_hszyzs_simple-table',
      );

      const indexTrs = (await indexTable.$$('tbody tr')) as any;

      for (let i = 0; i < 4; i++) {
        const indexTds = await indexTrs[i]?.$$('td');
        const list = [];
        for (let j = 0; j < indexTds.length; j++) {
          const value = await indexTds[j]?.evaluate((x) => x.textContent);
          list.push(value);
        }

        if (list[1] === '000001') {
          newDashboard.tradingVolume1 = parseFloat(list[7]);
          newDashboard.percentageChange1 = parseFloat(list[5]);
        }

        if (list[1] === '399001') {
          newDashboard.tradingVolume2 = parseFloat(list[7]);
          newDashboard.percentageChange2 = parseFloat(list[5]);
        }

        if (list[1] === '399006') {
          newDashboard.tradingVolume3 = parseFloat(list[7]);
          newDashboard.percentageChange3 = parseFloat(list[5]);
        }

        if (list[1] === '899050') {
          newDashboard.tradingVolume4 = parseFloat(list[7]);
          newDashboard.percentageChange4 = parseFloat(list[5]);
        }
      }
      newDashboard.tradingVolume =
        newDashboard.tradingVolume1 + newDashboard.tradingVolume2;

      await browser.close();
      return newDashboard;
    } catch (error) {
      console.log(error);
    }
  }

  async crawlSectorInfo() {
    // https://data.eastmoney.com/bkzj/BK1071.html
  }

  async crawlStockLimitUp(date: string): Promise<StockLimitUp[]> {
    const crawlInfo = {
      page: 'https://quote.eastmoney.com/ztb/detail#type=ztgc',
      onLoadSelector: '#zrzttable tfoot',
      moreSelector: '#zrzttable tfoot td',
      allStockSelector: '#zrzttable tbody tr',
      date: '#beginDate',
    };

    const { page, browser } = await this.initPuppeteer(crawlInfo.page);
    await page.waitForSelector(crawlInfo.onLoadSelector);

    const dateInput = (await page.$$(crawlInfo.date)) as any;
    const crawlDate = await dateInput?.[0]?.evaluate((x) => x.value);
    if (date !== crawlDate) {
      return [];
    }

    await page.click(crawlInfo.moreSelector);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const allStocks = (await page.$$(crawlInfo.allStockSelector)) as any;

    const stocks = [];
    const today = new Date(dayjs(date).format(FORMAT));

    for (let i = 0; i < allStocks.length; i++) {
      const stockInfo = await allStocks[i].$$('td');
      const newStockLimitUp = new StockLimitUp();

      const stockCode = await stockInfo[1].evaluate((x) => x.textContent);
      const stockName = await stockInfo[2].evaluate((x) => x.textContent);
      const volume = await stockInfo[5].evaluate((x) => x.textContent);
      const rate = await stockInfo[8].evaluate((x) => x.textContent);
      const fund = await stockInfo[9].evaluate((x) => x.textContent);
      const stockUpTime = await stockInfo[11].evaluate((x) => x.textContent);

      console.log(stockCode, stockName, volume, rate, fund, stockUpTime);
      newStockLimitUp.date = today;

      newStockLimitUp.stockCode = stockCode;
      newStockLimitUp.stockName = stockName;
      newStockLimitUp.turnoverRate = parseFloat(rate);
      if (fund?.endsWith('亿')) {
        newStockLimitUp.lockUpFunds = parseFloat(fund);
      } else if (fund?.endsWith('万')) {
        newStockLimitUp.lockUpFunds = parseFloat(fund) / 10000;
      }

      if (volume?.endsWith('亿')) {
        newStockLimitUp.tradingVolume = parseFloat(volume);
      } else if (volume?.endsWith('万')) {
        newStockLimitUp.tradingVolume = parseFloat(volume) / 10000;
      }

      if (this.isTimeLessThan(stockUpTime)) {
        newStockLimitUp.isCeilingLimitUp = true;
      }

      stocks.push(newStockLimitUp);
    }

    await browser.close();

    return stocks;
  }
}
