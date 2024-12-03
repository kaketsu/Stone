import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockLimitUp } from './entities/stock-limit-up.entity';
import { CreateStockLimitUpDto } from './dto/create-stock-limit-up.dto';

@Injectable()
export class StockLimitUpService {
  constructor(
    @InjectRepository(StockLimitUp)
    private readonly stockRepository: Repository<StockLimitUp>,
  ) {}

  createStockLimitUp(stock: StockLimitUp) {
    return this.stockRepository.save(stock);
  }

  saveStockLimitUps(stocks: StockLimitUp[]) {
    return this.stockRepository.save(stocks);
  }

  findAll(): Promise<StockLimitUp[]> {
    return this.stockRepository.find();
  }

  findStockLimitUp(id: string): Promise<StockLimitUp> {
    return this.stockRepository.findOneBy({ id });
  }

  findStockLimitUpByDateAndStock(date, stockCode): Promise<StockLimitUp> {
    return this.stockRepository.findOneBy({ date, stockCode });
  }

  findStockLimitUpByDate(date: Date): Promise<StockLimitUp[]> {
    return this.stockRepository.findBy({ date });
  }

  updateStockLimitUp(
    id: string,
    createStockLimitUpDto: CreateStockLimitUpDto,
  ): Promise<any> {
    return this.stockRepository.update(id, createStockLimitUpDto);
  }

  removeStockLimitUp(stockId: number): Promise<{ affected?: number }> {
    return this.stockRepository.delete(stockId);
  }

  removeOneDayStockLimitUp(date: Date): Promise<{ affected?: number }> {
    return this.stockRepository.delete(date);
  }
}
