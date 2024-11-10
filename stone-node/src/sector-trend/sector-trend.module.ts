import { Module } from '@nestjs/common';
import { SectorTrendController } from './sector-trend.controller';
import { SectorTrendService } from './sector-trend.service';

@Module({
  controllers: [SectorTrendController],
  providers: [SectorTrendService],
})
export class SectorTrendModule {}
