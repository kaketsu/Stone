import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StockLimitUpStatisticsService } from './stock-limit-up-statistics.service';
import * as dayjs from 'dayjs';
import { FORMAT } from 'src/utils/constants';

@Controller('stock-limit-up-statistics')
export class StockLimitUpStatisticsController {
  constructor(
    private readonly stockLimitUpStatisticsService: StockLimitUpStatisticsService,
  ) {}

  @Get()
  findAll() {
    return this.stockLimitUpStatisticsService.findAll();
  }

  @Post()
  create(@Body() createStatistics: { dateString: string }) {
    const { dateString } = createStatistics;

    return this.stockLimitUpStatisticsService.createStockLimitUpStatistics(
      new Date(dayjs(dateString).format(FORMAT)),
    );
  }

  @Get('date/:dateString')
  async getStockLimitUpStatistics(@Param('dateString') dateString: string) {
    const date = new Date(dayjs(dateString).format(FORMAT));
    const statistics =
      await this.stockLimitUpStatisticsService.findOneByDate(dateString);

    if (!statistics) {
      return this.stockLimitUpStatisticsService.createStockLimitUpStatistics(
        date,
      );
    }
    return statistics;
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/stock/:id
   */
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.stockLimitUpStatisticsService.findStockLimitUpStatistics(id);
  // }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/stock/:id
   */
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateStockLimitUpStatisticsDto: UpdateStockLimitUpStatisticsDto,
  // ) {
  //   return this.stockLimitUpStatisticsService.updateStockLimitUpStatistics(
  //     +id,
  //     updateStockLimitUpStatisticsDto,
  //   );
  // }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/stock/:id
   */
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.stockLimitUpStatisticsService.removeStockLimitUpStatistics(+id);
  // }
}
