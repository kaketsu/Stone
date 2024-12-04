import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLimitUpStatisticsResolver } from './stock-limit-up-statistics.resolver';
import { StockLimitUpStatisticsService } from './stock-limit-up-statistics.service';
import { StockLimitUpStatistics } from './entities/stock-limit-up-statistics.entity';
import { StockLimitUpStatisticsController } from './stock-limit-up-statistics.controller';
import { StockLimitUpService } from 'src/stock-limit-up/stock-limit-up.service';
import { StockLimitUp } from '../stock-limit-up/entities/stock-limit-up.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockLimitUpStatistics, StockLimitUp])],
  controllers: [StockLimitUpStatisticsController],
  providers: [
    StockLimitUpStatisticsResolver,
    StockLimitUpStatisticsService,
    StockLimitUpService,
  ],
})
export class StockLimitUpStatisticsModule {}
