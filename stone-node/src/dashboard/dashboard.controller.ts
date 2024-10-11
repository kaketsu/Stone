import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
// import { UpdateDashboardDto } from './dto/update-dashboard.dto';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/dashboard
 */
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Dashboard will be
   * POST http://localhost:3000/dashboard
   */
  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.createDashboard(createDashboardDto);
  }

  /**
   * we have used get decorator to get all the dashboard's list
   * so the API URL will be
   * GET http://localhost:3000/dashboard
   */
  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/dashboard/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findDashboard(id);
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/dashboard/:id
   */
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDashboardDto: UpdateDashboardDto,
  // ) {
  //   return this.dashboardService.updateDashboard(+id, updateDashboardDto);
  // }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/dashboard/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.removeDashboard(+id);
  }
}
