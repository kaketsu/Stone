import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository, UpdateResult } from 'typeorm';
import { Dashboard } from './entities/dashboard.entity';
import { CreateDashboardDto } from './dto/create-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private readonly dashboardRepository: Repository<Dashboard>,
  ) {}

  createDashboard(createDashboardDto: CreateDashboardDto) {
    return this.dashboardRepository.save(createDashboardDto);
  }

  findAll(): Promise<Dashboard[]> {
    return this.dashboardRepository.find({
      order: {
        date: 'ASC', // 或者 'ASC' 进行升序排序
      },
    });
  }

  findDashboard(id: string): Promise<Dashboard> {
    return this.dashboardRepository.findOneBy({ id });
  }
  async findDashboardByDate(date: Date): Promise<Dashboard> {
    return this.dashboardRepository.findOneBy({ date });
  }

  async updateDashboard(
    id: string,
    updateDashboardDto: CreateDashboardDto,
  ): Promise<UpdateResult> {
    return this.dashboardRepository.update(id, updateDashboardDto);
  }

  removeDashboard(dashboardId: number): Promise<{ affected?: number }> {
    return this.dashboardRepository.delete(dashboardId);
  }

  // calculateHeatValue(createDashboardDto: CreateDashboardDto): number {
  //   // Implement the logic to calculate the heat value
  //   // This is a placeholder implementation
  //   return Math.random() * 100;
  // }

  findDashboardsByDateRange(startDate: Date, endDate: Date) {
    return this.dashboardRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      order: {
        date: 'ASC', // 或者 'ASC' 进行升序排序
      },
    });
  }

  // 10 * 2
  // 20 * 3
  // 30 * 4
  // 一 * 5
  calcDashboardLimitUpIndex(l1, l2, l3, l0) {
    return l1 * 2 + l2 * 3 + l3 * 4 + l0 * 5;
  }
}
