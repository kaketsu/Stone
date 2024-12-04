import { Module } from '@nestjs/common';
import { TradeDayService } from './trade-day.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeDay } from './entities/trade-day.entity';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([TradeDay])],
  providers: [TradeDayService],
})
export class TradeDayModule {}
