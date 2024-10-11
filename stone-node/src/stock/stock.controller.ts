import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/stock
 */
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Stock will be
   * POST http://localhost:3000/stock
   */
  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStock(createStockDto);
  }

  /**
   * we have used get decorator to get all the stock's list
   * so the API URL will be
   * GET http://localhost:3000/stock
   */
  @Get()
  findAll() {
    return this.stockService.findAll();
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/stock/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockService.findStock(id);
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/stock/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stockService.updateStock(+id, updateStockDto);
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/stock/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.removeStock(+id);
  }
}
