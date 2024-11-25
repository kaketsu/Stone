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
    const dashboard: Dashboard = new Dashboard();

    dashboard.date = createDashboardDto.date;
    dashboard.tradingVolume = createDashboardDto.tradingVolume;
    dashboard.tradingVolume1 = createDashboardDto.tradingVolume1;
    dashboard.tradingVolume2 = createDashboardDto.tradingVolume2;
    dashboard.tradingVolume3 = createDashboardDto.tradingVolume3;
    dashboard.tradingVolume4 = createDashboardDto.tradingVolume4;

    dashboard.percentageChange1 = createDashboardDto.percentageChange1;
    dashboard.percentageChange2 = createDashboardDto.percentageChange2;
    dashboard.percentageChange3 = createDashboardDto.percentageChange3;
    dashboard.percentageChange4 = createDashboardDto.percentageChange4;

    dashboard.limitUpCount1 = createDashboardDto.limitUpCount1;
    dashboard.limitUpCount2 = createDashboardDto.limitUpCount2;
    dashboard.limitUpCount3 = createDashboardDto.limitUpCount3;
    dashboard.limitUpCountBeforeCallAuction =
      createDashboardDto.limitUpCountBeforeCallAuction;
    dashboard.limitDownCount1 = createDashboardDto.limitDownCount1;
    dashboard.limitDownCount2 = createDashboardDto.limitDownCount2;
    dashboard.limitDownCount3 = createDashboardDto.limitDownCount3;
    dashboard.limitDownCountBeforeCallAuction =
      createDashboardDto.limitDownCountBeforeCallAuction;
    dashboard.redStockCount = createDashboardDto.redStockCount;
    dashboard.heat = createDashboardDto.heat;

    return this.dashboardRepository.save(dashboard);
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
    console.log(updateDashboardDto);
    // const dashboard: Dashboard = new Dashboard();
    // dashboard.date = updateDashboardDto.date;
    // const currentDashboard = await this.findDashboardByDate(date);

    // dashboard.mainSector = updateDashboardDto.mainSector;
    // dashboard.subSector = updateDashboardDto.subSector;

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
