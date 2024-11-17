import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './entities/dashboard.entity';
import { DashboardController } from './dashboard.controller';
import { ItchService } from 'src/itch/itch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard])],
  providers: [DashboardResolver, DashboardService, ItchService],
  controllers: [DashboardController],
})
export class DashboardModule {}
