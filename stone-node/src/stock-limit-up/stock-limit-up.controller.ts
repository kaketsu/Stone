import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockLimitUpService } from './stock-limit-up.service';
import { CreateStockLimitUpDto } from './dto/create-stock-limit-up.dto';
import { UpdateStockLimitUpDto } from './dto/update-stock-limit-up.dto';
import { ItchService } from '../itch/itch.service';

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

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create StockLimitUp will be
   * POST http://localhost:3000/stock
   */
  @Post()
  create(@Body() createStockLimitUpDto: CreateStockLimitUpDto) {
    return this.stockLimitUpService.createStockLimitUp(createStockLimitUpDto);
  }

  /**
   * we have used get decorator to get all the stock's list
   * so the API URL will be
   * GET http://localhost:3000/stock
   */
  @Get()
  findAll() {
    return this.stockLimitUpService.findAll();
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/stock/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockLimitUpService.findStockLimitUp(id);
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/stock/:id
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockLimitUpDto: UpdateStockLimitUpDto,
  ) {
    return this.stockLimitUpService.updateStockLimitUp(
      +id,
      updateStockLimitUpDto,
    );
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/stock/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockLimitUpService.removeStockLimitUp(+id);
  }

  @Get('crawl/:date')
  async crawlStockLimitUp(@Param('date') dateString: string) {
    // const date = new Date(dayjs(dateString).format(FORMAT));
    const stocks = await this.itchService.crawlStockLimitUp(dateString);
    return this.stockLimitUpService.saveStockLimitUps(stocks);
  }
}
