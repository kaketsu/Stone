import { Controller, Get, Param } from '@nestjs/common';
import { ItchService } from './itch.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
@Controller('itch')
export class ItchController {
  constructor(
    private readonly itchService: ItchService,
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('stock-limit-up/:dateString')
  itchStocks(@Param('dateString') dateString: string) {
    return this.itchService.crawlStockLimitUp(dateString);
  }

  // TODO: 有没有历史记录
  @Get('dashboard')
  itchDashboard() {
    return this.itchService.crawlDashboard();
  }

  @Get('dashboard/stocks/:dateString')
  calDashboardFromStocks(@Param('dateString') dateString: string) {
    return this.itchService.calculateDashboardFromStocks(dateString);
  }

  @Get('statistics/stocks/:dateString')
  calStatisticsFromStocks(@Param('dateString') dateString: string) {
    return this.itchService.createStockLimitUpStatistics(dateString);
  }
}
