import { Controller, Get } from '@nestjs/common';
import { ItchService } from './itch.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { Dashboard } from 'src/dashboard/entities/dashboard.entity';
import * as dayjs from 'dayjs';

const format = 'YYYY-MM-DD 00:00:00';
@Controller('itch')
export class ItchController {
  constructor(
    private readonly itchService: ItchService,
    private readonly dashboardService: DashboardService,
  ) {}

  @Get()
  async findAll() {
    const date = new Date(dayjs(new Date()).format(format));
    const newDashboard = new Dashboard();
    newDashboard.date = date;

    const res = await this.itchService.crawlDataFromDashboard();
    newDashboard.limitUpCount1 = res.limitUp?.count1;
    newDashboard.limitUpCount2 = res.limitUp?.count2;
    newDashboard.limitUpCount3 = res.limitUp?.count3;
    newDashboard.limitUpCountBeforeCallAuction =
      res.limitUp?.countBeforeCallAuction;
    newDashboard.limitDownCount1 = res.limitDown?.count1;
    newDashboard.limitDownCount2 = res.limitDown?.count2;
    newDashboard.limitDownCount3 = res.limitDown?.count3;
    newDashboard.limitDownCountBeforeCallAuction =
      res.limitDown?.countBeforeCallAuction;

    const res2 = await this.itchService.crawDataFromIndex();
    Object.assign(newDashboard, res2);

    const currentDashboard =
      await this.dashboardService.findDashboardByDate(date);

    if (currentDashboard) {
      this.dashboardService.updateDashboard(
        currentDashboard.id,
        Object.assign(currentDashboard, newDashboard),
      );
    } else {
      this.dashboardService.createDashboard(newDashboard);
    }

    return newDashboard;
  }

  @Get('ztgc')
  findZtgc() {
    return this.itchService.crawlDataFromDashboard();
  }

  @Get('index')
  findIndex() {
    return this.itchService.crawDataFromIndex();
  }
}
