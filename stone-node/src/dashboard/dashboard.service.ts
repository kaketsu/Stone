import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    dashboard.openDate = createDashboardDto.openDate;
    dashboard.tradingVolume = createDashboardDto.tradingVolume;
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
    return this.dashboardRepository.find();
  }

  findDashboard(id: string): Promise<Dashboard> {
    return this.dashboardRepository.findOneBy({ id });
  }

  // updateDashboard(
  //   id: number,
  //   updateDashboardDto: UpdateDashboardDto,
  // ): Promise<Dashboard> {
  //   const dashboard: Dashboard = new Dashboard();
  //   dashboard.openDate = updateDashboardDto.openDate;
  //   // dashboard.dashboardCode = updateDashboardDto.dashboardCode;
  //   // dashboard.mainSector = updateDashboardDto.mainSector;
  //   // dashboard.subSector = updateDashboardDto.subSector;
  //   return this.dashboardRepository.save(dashboard);
  // }

  removeDashboard(dashboardId: number): Promise<{ affected?: number }> {
    return this.dashboardRepository.delete(dashboardId);
  }

  calculateHeatValue(createDashboardDto: CreateDashboardDto): number {
    // Implement the logic to calculate the heat value
    // This is a placeholder implementation
    return Math.random() * 100;
  }
}
