import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TradeDayService } from 'src/trade-day/trade-day.service';
import { FORMAT } from 'src/utils/constants';
import * as dayjs from 'dayjs';
import { ItchService } from 'src/itch/itch.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly tradeDayService: TradeDayService,
    private readonly itchService: ItchService,
  ) {}
  @Cron('0/10 * * * *')
  handleCron() {
    console.log('执行定时任务...');
    // 在这里编写你的定时任务逻辑
  }

  @Cron('0 1 15 * * *')
  async crawlDashboardDate() {
    console.log('start crawl DashboardDate');
    const todayString = dayjs().format(FORMAT);
    const isTradeDay = await this.tradeDayService.isTradeDay(todayString);
    if (isTradeDay) {
      // TODO:
      this.itchService.crawlDashboard();
    } else {
      console.log('Not Trade Day');
      return 'Not Trade Day';
    }
  }

  @Cron('0 2 15 * * *')
  async crawlLimitUp() {
    console.log('start crawl Stocks');
    const todayString = dayjs().format(FORMAT);
    const isTradeDay = await this.tradeDayService.isTradeDay(todayString);
    if (isTradeDay) {
      this.itchService.crawlStockLimitUp(todayString);
    } else {
      console.log('Not Trade Day');
      return 'Not Trade Day';
    }
  }

  @Cron('0 5 15 * * *')
  async calDashboard() {
    console.log('start dashboard form stocks');
    const todayString = dayjs().format(FORMAT);
    const isTradeDay = await this.tradeDayService.isTradeDay(todayString);
    if (isTradeDay) {
      this.itchService.calculateDashboardFromStocks(todayString);
    } else {
      console.log('Not Trade Day');
      return 'Not Trade Day';
    }
  }

  @Cron('0 5 15 * * *')
  async calStatistics() {
    console.log('start statistics form stocks');
    const todayString = dayjs().format(FORMAT);
    const isTradeDay = await this.tradeDayService.isTradeDay(todayString);
    if (isTradeDay) {
      this.itchService.createStockLimitUpStatistics(todayString);
    } else {
      console.log('Not Trade Day');
      return 'Not Trade Day';
    }
  }

  @Cron('0 0 0 * * *')
  async initTradeDay() {
    console.log('init', dayjs().format(FORMAT));
    this.tradeDayService.initTradeDay();
  }
}
