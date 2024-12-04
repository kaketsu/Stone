import { Module } from '@nestjs/common';
import { ItchController } from './itch.controller';
import { ItchService } from './itch.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from '../dashboard/entities/dashboard.entity';
import { StockLimitUp } from 'src/stock-limit-up/entities/stock-limit-up.entity';
import { StockLimitUpService } from 'src/stock-limit-up/stock-limit-up.service';
import { StockLimitUpStatisticsService } from '../stock-limit-up-statistics/stock-limit-up-statistics.service';
import { StockLimitUpStatistics } from 'src/stock-limit-up-statistics/entities/stock-limit-up-statistics.entity';
import { TradeDayService } from 'src/trade-day/trade-day.service';
import { TradeDay } from 'src/trade-day/entities/trade-day.entity';

@Module({
  controllers: [ItchController],
  imports: [
    TypeOrmModule.forFeature([
      Dashboard,
      StockLimitUp,
      StockLimitUpStatistics,
      TradeDay,
    ]),
  ],
  providers: [
    ItchService,
    TradeDayService,
    DashboardService,
    StockLimitUpService,
    StockLimitUpStatisticsService,
  ],
})
export class ItchModule {}
