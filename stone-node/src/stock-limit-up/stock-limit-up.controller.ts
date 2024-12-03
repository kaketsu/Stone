import { Controller, Get, Param, Delete } from '@nestjs/common';
import { StockLimitUpService } from './stock-limit-up.service';
import { ItchService } from '../itch/itch.service';
import * as dayjs from 'dayjs';
import { FORMAT } from 'src/utils/constants';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/stock
 */
@Controller('stock-limit-up')
export class StockLimitUpController {
  constructor(
    private readonly stockLimitUpService: StockLimitUpService,
    private readonly itchService: ItchService,
  ) {}

  @Get()
  findAll() {
    return this.stockLimitUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockLimitUpService.findStockLimitUp(id);
  }

  @Get('date/:dateString')
  getLimitUpByDate(@Param('dateString') dateString: string) {
    const date = new Date(dayjs(dateString).format(FORMAT));
    return this.stockLimitUpService.findStockLimitUpByDate(date);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockLimitUpService.removeStockLimitUp(+id);
  }

  @Delete('date/:dateString')
  removeDate(@Param('dateString') dateString: string) {
    const date = new Date(dayjs(dateString).format(FORMAT));
    return this.stockLimitUpService.removeOneDayStockLimitUp(date);
  }

  @Get('crawl/:dateString')
  async crawlStockLimitUp(@Param('dateString') dateString: string) {
    // const date = new Date(dayjs(dateString).format(FORMAT));
    const stocks = await this.itchService.crawlStockLimitUp(dateString);

    for (let i = 0; i < stocks.length; i++) {
      const stockRes =
        await this.stockLimitUpService.findStockLimitUpByDateAndStock(
          new Date(dayjs(dateString).format(FORMAT)),
          stocks[i].stockCode,
        );

      if (stockRes && stockRes.id) {
        this.stockLimitUpService.updateStockLimitUp(stockRes.id, stocks[i]);
      } else {
        this.stockLimitUpService.createStockLimitUp(stocks[i]);
      }
    }
    // return this.stockLimitUpService.saveStockLimitUps(stocks);
  }
}
