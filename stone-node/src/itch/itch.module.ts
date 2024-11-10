import { Module } from '@nestjs/common';
import { ItchController } from './itch.controller';
import { ItchService } from './itch.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from '../dashboard/entities/dashboard.entity';

@Module({
  controllers: [ItchController],
  imports: [TypeOrmModule.forFeature([Dashboard])],
  providers: [ItchService, DashboardService],
})
export class ItchModule {}
