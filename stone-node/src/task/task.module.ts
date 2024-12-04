import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TradeDayService } from 'src/trade-day/trade-day.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeDay } from 'src/trade-day/entities/trade-day.entity';
import { ItchService } from 'src/itch/itch.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { StockLimitUpService } from 'src/stock-limit-up/stock-limit-up.service';
import { Dashboard } from 'src/dashboard/entities/dashboard.entity';
import { StockLimitUp } from 'src/stock-limit-up/entities/stock-limit-up.entity';
import { StockLimitUpStatisticsService } from 'src/stock-limit-up-statistics/stock-limit-up-statistics.service';
import { StockLimitUpStatistics } from 'src/stock-limit-up-statistics/entities/stock-limit-up-statistics.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([
      TradeDay,
      Dashboard,
      StockLimitUp,
      StockLimitUpStatistics,
    ]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    TradeDayService,
    ItchService,
    DashboardService,
    StockLimitUpService,
    StockLimitUpStatisticsService,
  ],
})
export class TaskModule {}
