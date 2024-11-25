import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLimitUpResolver } from './stock-limit-up.resolver';
import { StockLimitUpService } from './stock-limit-up.service';
import { StockLimitUp } from './entities/stock-limit-up.entity';
import { StockLimitUpController } from './stock-limit-up.controller';
import { ItchService } from '../itch/itch.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockLimitUp])],
  providers: [StockLimitUpResolver, StockLimitUpService, ItchService],
  controllers: [StockLimitUpController],
})
export class StockLimitUpModule {}
