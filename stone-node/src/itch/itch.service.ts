import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import puppeteer from 'puppeteer';
import { Dashboard } from 'src/dashboard/entities/dashboard.entity';
import { StockLimitUp } from 'src/stock-limit-up/entities/stock-limit-up.entity';
import { FORMAT } from 'src/utils/constants';
import { DashboardService } from '../dashboard/dashboard.service';
import { StockLimitUpService } from 'src/stock-limit-up/stock-limit-up.service';
import { StockLimitUpStatistics } from '../stock-limit-up-statistics/entities/stock-limit-up-statistics.entity';
import { StockLimitUpStatisticsService } from 'src/stock-limit-up-statistics/stock-limit-up-statistics.service';
import { TradeDayService } from 'src/trade-day/trade-day.service';

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
  constructor(
    private readonly tradeDayService: TradeDayService,
    private readonly dashboardService: DashboardService,
    private readonly stockLimitUpService: StockLimitUpService,
    private readonly stockLimitUpStatisticsService: StockLimitUpStatisticsService,
  ) {}

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
  // async crawlZtgc(ztgcCrawlInfo: any) {
  //   const { page, browser } = await this.initPuppeteer(ztgcCrawlInfo.page);

  //   try {
  //     await page.waitForSelector(ztgcCrawlInfo.onLoadSelector);
  //     const more = await page.$$(ztgcCrawlInfo.moreSelector);
  //     if (more) {
  //       await page.click(ztgcCrawlInfo.moreSelector);
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //     }

  //     const allStocks = (await page.$$(ztgcCrawlInfo.allStockSelector)) as any;

  //     let count1 = 0;
  //     let count2 = 0;
  //     let count3 = 0;
  //     let countBeforeCallAuction = 0;
  //     let date = '';
  //     let allAmount = 0;

  //     for (let i = 0; i < allStocks.length; i++) {
  //       const stockInfo = await allStocks[i].$$('td');
  //       const stockUpValue = await stockInfo[3].evaluate((x) => x.textContent);
  //       const stockUpTime = await stockInfo[11].evaluate((x) => x.textContent);
  //       const fund = await stockInfo[9].evaluate((x) => x.textContent);

  //       const parsedStockUpValue = this.percentToNumber(stockUpValue);

  //       if (Number(parsedStockUpValue) <= 11) {
  //         count1++;
  //       } else if (
  //         Number(parsedStockUpValue) > 11 &&
  //         Number(parsedStockUpValue) <= 21
  //       ) {
  //         count2++;
  //       } else if (Number(parsedStockUpValue) > 29) {
  //         count3++;
  //       }

  //       if (this.isTimeLessThan(stockUpTime)) {
  //         countBeforeCallAuction++;
  //       }

  //       if (fund?.endsWith('亿')) {
  //         allAmount += parseFloat(fund);
  //       } else if (fund?.endsWith('万')) {
  //         allAmount += parseFloat(fund) / 10000;
  //       }
  //     }

  //     if (ztgcCrawlInfo.date) {
  //       const dateInput = (await page.$$(ztgcCrawlInfo.date)) as any;

  //       date = await dateInput?.[0]?.evaluate((x) => x.value);
  //     }

  //     await browser.close();

  //     return {
  //       date,
  //       count1,
  //       count2,
  //       count3,
  //       countBeforeCallAuction,
  //       allAmount,
  //     };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async crawlDataFromLimitUpAndDown() {
  //   const ztgcCrawlInfo = {
  //     page: 'https://quote.eastmoney.com/ztb/detail#type=ztgc',
  //     onLoadSelector: '#zrzttable tfoot',
  //     moreSelector: '#zrzttable tfoot td',
  //     allStockSelector: '#zrzttable tbody tr',
  //     date: '#beginDate',
  //   };

  //   const dtgcCrawlInfo = {
  //     page: 'https://quote.eastmoney.com/ztb/detail#type=dtgc',
  //     onLoadSelector: '#zrzttable tfoot',
  //     moreSelector: '#zrzttable tfoot td',
  //     allStockSelector: '#zrzttable tbody tr',
  //     date: '#beginDate',
  //   };

  //   const limitUpData = await this.crawlZtgc(ztgcCrawlInfo);
  //   const limitDownData = await this.crawlZtgc(dtgcCrawlInfo);

  //   return {
  //     date: limitUpData?.date,
  //     allAmount: limitUpData.allAmount,
  //     limitUp: limitUpData,
  //     limitDown: limitDownData,
  //   };
  // }
  calcDashboardLimitUpIndex(l1, l2, l3, l0) {
    return l1 * 2 + l2 * 3 + l3 * 4 + l0 * 5;
  }

  // 大盘
  async crawlDashboard() {
    const date = new Date(dayjs().format(FORMAT));
    const newDashboard = new Dashboard();
    newDashboard.date = date;

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

      const currentDashboard =
        await this.dashboardService.findDashboardByDate(date);

      if (currentDashboard) {
        this.dashboardService.updateDashboard(
          currentDashboard.id,
          Object.assign(currentDashboard, newDashboard),
        );

        console.log('update', newDashboard);
      } else {
        this.dashboardService.createDashboard(newDashboard);
        console.log('create', newDashboard);
      }

      return newDashboard;
    } catch (error) {
      console.log(error);
    }
  }

  async crawlSectorInfo() {
    // https://data.eastmoney.com/bkzj/BK1071.html
  }

  async crawlStockLimitUp(dateString: string): Promise<StockLimitUp[]> {
    console.log('start crawl stocks');

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
    let crawlDate = await dateInput?.[0]?.evaluate((x) => x.value);
    if (dateString !== crawlDate) {
      const day = dayjs(dateString).date();

      await dateInput?.[0].click();
      const datePicker = (await page.$$(
        `.pika-lendar table td[data-day="${day}"]`,
      )) as any;

      await datePicker?.[0].click();
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    crawlDate = await dateInput?.[0]?.evaluate((x) => x.value);
    if (dateString !== crawlDate) {
      console.log('invalid date');
      return [];
    }

    await page.click(crawlInfo.moreSelector);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const allStocks = (await page.$$(crawlInfo.allStockSelector)) as any;

    const stocks = [];
    const today = new Date(dayjs(dateString).format(FORMAT));

    for (let i = 0; i < allStocks.length; i++) {
      const stockInfo = await allStocks[i].$$('td');
      const newStockLimitUp = new StockLimitUp();

      const stockCode = await stockInfo[1].evaluate((x) => x.textContent);
      const stockName = await stockInfo[2].evaluate((x) => x.textContent);
      const percentage = await stockInfo[3].evaluate((x) => x.textContent);
      const price = await stockInfo[4].evaluate((x) => x.textContent);
      const volume = await stockInfo[5].evaluate((x) => x.textContent);
      const marketValue = await stockInfo[7].evaluate((x) => x.textContent);
      const rate = await stockInfo[8].evaluate((x) => x.textContent);
      const fund = await stockInfo[9].evaluate((x) => x.textContent);
      const stockUpTime = await stockInfo[11].evaluate((x) => x.textContent);
      const limitUpLevel = await stockInfo[14].evaluate((x) => x.textContent);

      if (marketValue?.endsWith('亿')) {
        newStockLimitUp.totalMarketValue = parseFloat(marketValue);
      } else if (marketValue?.endsWith('万')) {
        newStockLimitUp.totalMarketValue = parseFloat(marketValue) / 10000;
      }

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

      if (limitUpLevel === '首板') {
        newStockLimitUp.limitUpLevel = 1;
      } else {
        newStockLimitUp.limitUpLevel = parseFloat(limitUpLevel);
      }

      newStockLimitUp.date = today;
      newStockLimitUp.stockCode = stockCode;
      newStockLimitUp.stockName = stockName;
      newStockLimitUp.turnoverRate = parseFloat(rate);
      newStockLimitUp.percentage = parseFloat(percentage);
      newStockLimitUp.lastStockUpTime = stockUpTime;
      newStockLimitUp.price = price;

      const stockRes =
        await this.stockLimitUpService.findStockLimitUpByDateAndStock(
          new Date(dayjs(dateString).format(FORMAT)),
          stockCode,
        );

      if (stockRes && stockRes.id) {
        this.stockLimitUpService.updateStockLimitUp(
          stockRes.id,
          newStockLimitUp,
        );
        console.log('update', newStockLimitUp);
      } else {
        this.stockLimitUpService.createStockLimitUp(newStockLimitUp);
        console.log('new', newStockLimitUp);
      }
      stocks.push(newStockLimitUp);
    }

    await browser.close();
    return stocks;
  }

  async calculateDashboardFromStocks(dateString: string): Promise<Dashboard> {
    const date = new Date(dayjs(dateString).format(FORMAT));
    const newDashboard = new Dashboard();

    const allStocks =
      await this.stockLimitUpService.findStockLimitUpByDate(date);
    newDashboard.limitUpCount = allStocks.length;

    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let countBeforeCallAuction = 0;
    let allAmount = 0;

    for (let i = 0; i < allStocks.length; i++) {
      const stockUpValue = allStocks[i].percentage;
      const fund = allStocks[i].lockUpFunds;

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

      if (allStocks[i].isCeilingLimitUp) {
        countBeforeCallAuction++;
      }
      allAmount += Number(fund);
    }

    newDashboard.limitUpCount1 = count1;
    newDashboard.limitUpCount2 = count2;
    newDashboard.limitUpCount3 = count3;
    newDashboard.limitUpCountBeforeCallAuction = countBeforeCallAuction;
    newDashboard.allLockUpAmount = allAmount;
    newDashboard.limitUpIndex = this.calcDashboardLimitUpIndex(
      count1,
      count2,
      count3,
      countBeforeCallAuction,
    );

    const currentDashboard =
      await this.dashboardService.findDashboardByDate(date);

    if (currentDashboard) {
      this.dashboardService.updateDashboard(
        currentDashboard.id,
        Object.assign(currentDashboard, newDashboard),
      );

      console.log('update', newDashboard);
    } else {
      this.dashboardService.createDashboard(newDashboard);
      console.log('create', newDashboard);
    }

    return;
  }

  async createStockLimitUpStatistics(dateString: string) {
    const exist =
      await this.stockLimitUpStatisticsService.findOneByDate(dateString);
    if (exist) {
      await this.stockLimitUpStatisticsService.deleteOneByDate(dateString);
    }

    const tradeDay = await this.tradeDayService.isTradeDay(dateString);

    if (tradeDay) {
      const stockLimitUpStatistics: StockLimitUpStatistics =
        new StockLimitUpStatistics();
      const date = new Date(dayjs(dateString).format(FORMAT));
      stockLimitUpStatistics.date = date;

      const todayStocks =
        await this.stockLimitUpService.findStockLimitUpByDate(date);
      const dateBefore = tradeDay.previousTradeDate;
      const yesterdayStocks =
        await this.stockLimitUpService.findStockLimitUpByDate(dateBefore);

      const stocksBoth = [];
      for (let i = 0; i < yesterdayStocks.length; i++) {
        const exist = todayStocks.find(
          (st) => st.stockCode === yesterdayStocks[i].stockCode,
        );

        if (exist) {
          stocksBoth.push(exist);
        }
      }

      const level1 = todayStocks.filter((st) => st.limitUpLevel === 1)?.length;
      stockLimitUpStatistics.limitUpLevel1 = level1;
      stockLimitUpStatistics.limitUpLevel1Percentage = 0;

      const levelMore = stocksBoth.filter((st) => st.limitUpLevel > 8)?.length;
      const level8Yesterday = yesterdayStocks.filter(
        (st) => st.limitUpLevel === 8,
      )?.length;
      stockLimitUpStatistics.limitUpLevelMore = levelMore;
      if (level8Yesterday === 0) {
        stockLimitUpStatistics.limitUpLevelMorePercentage = 0;
      } else {
        const num = levelMore / level8Yesterday;
        stockLimitUpStatistics.limitUpLevelMorePercentage = parseFloat(
          num.toFixed(4),
        );
      }

      for (let degree = 2; degree < 8; degree++) {
        const level = stocksBoth.filter(
          (st) => st.limitUpLevel === degree,
        )?.length;
        const levelYesterday = yesterdayStocks.filter(
          (st) => st.limitUpLevel === degree - 1,
        )?.length;
        stockLimitUpStatistics[`limitUpLevel${degree}`] = level;

        if (levelYesterday === 0) {
          stockLimitUpStatistics[`limitUpLevel${degree}Percentage`] = 0;
        } else {
          const num = level / levelYesterday;
          stockLimitUpStatistics[`limitUpLevel${degree}Percentage`] =
            parseFloat(num.toFixed(4));
        }
      }

      console.log(stockLimitUpStatistics);
      return this.stockLimitUpStatisticsService.save(stockLimitUpStatistics);
    }
  }
}
