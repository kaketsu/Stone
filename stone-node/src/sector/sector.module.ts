import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorResolver } from './sector.resolver';
import { SectorService } from './sector.service';
import { Sector } from './entities/sector.entity';
import { SectorController } from './sector.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  providers: [SectorResolver, SectorService],
  controllers: [SectorController],
})
export class SectorModule {}
