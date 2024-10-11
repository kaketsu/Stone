import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StockResolver } from './stock.resolver';
import { StockService } from './stock.service';
import { Stock } from './entities/stock.entity';
import { StockController } from './stock.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StockResolver, StockService],
  controllers: [StockController],
})
export class StockModule {}
