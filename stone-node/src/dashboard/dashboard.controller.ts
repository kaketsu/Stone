import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import * as dayjs from 'dayjs';
import { FORMAT } from 'src/utils/constants';
import { ItchService } from '../itch/itch.service';
import { Dashboard } from 'src/dashboard/entities/dashboard.entity';

// import { UpdateDashboardDto } from './dto/update-dashboard.dto';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/dashboard
 */
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
    private readonly itchService: ItchService,
  ) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Dashboard will be
   * POST http://localhost:3000/dashboard
   */
  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.createDashboard(createDashboardDto);
  }

  /**
   * we have used get decorator to get all the dashboard's list
   * so the API URL will be
   * GET http://localhost:3000/dashboard
   */
  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/dashboard/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findDashboard(id);
  }

  @Get('date/:date')
  findOneByDate(@Param('date') dateString: string) {
    const date = new Date(dayjs(dateString).format(FORMAT));
    return this.dashboardService.findDashboardByDate(date);
  }

  @Post('date/range')
  findByDateRange(@Body() body) {
    const { startDate, endDate } = body;
    const start = new Date(dayjs(startDate).format(FORMAT));
    const end = new Date(dayjs(endDate).format(FORMAT));
    return this.dashboardService.findDashboardsByDateRange(start, end);
  }
  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/dashboard/:id
   */
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDashboardDto: UpdateDashboardDto,
  // ) {
  //   return this.dashboardService.updateDashboard(+id, updateDashboardDto);
  // }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/dashboard/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.removeDashboard(+id);
  }

  @Get('crawl/:date')
  async crawlDashboard(@Param('date') dateString: string) {
    const date = new Date(dayjs(dateString).format(FORMAT));

    if (dayjs(dateString).day() === 0 || dayjs(dateString).day() === 6) {
      return 'weekend';
    }

    const newDashboard = new Dashboard();
    newDashboard.date = date;
    const res = await this.itchService.crawlDataFromDashboard();
    if (res.date !== dateString) {
      return {};
    }

    newDashboard.limitUpCount1 = res.limitUp?.count1;
    newDashboard.limitUpCount2 = res.limitUp?.count2;
    newDashboard.limitUpCount3 = res.limitUp?.count3;
    newDashboard.limitUpCountBeforeCallAuction =
      res.limitUp?.countBeforeCallAuction;
    newDashboard.allLockUpAmount = res.limitUp.allAmount;

    newDashboard.limitUpIndex = this.dashboardService.calcDashboardLimitUpIndex(
      res.limitUp.count1,
      res.limitUp.count2,
      res.limitUp.count3,
      res.limitUp.countBeforeCallAuction,
    );
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
}
