import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { DashboardService } from 'src/dashboard/dashboard.service';
@Injectable()
export class ItchService {
  constructor(private dashboardService: DashboardService) {}

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

  async crawlDashboard() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://juejin.cn/');

    // Set screen size
    await page.setViewport({ width: 1920, height: 1080 });

    await page.waitForSelector('.entry-list');
    await page.screenshot({ path: 'picture.png' });
    const titleDom = await page.$$('div.title-row > a');

    console.log(titleDom);

    // const crawlDashboardData = {};

    // this.dashboardService.createDashboard(crawlDashboardData);

    // 能不能用这个做一个热度的加权
  }
}
