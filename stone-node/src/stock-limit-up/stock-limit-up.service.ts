import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockLimitUp } from './entities/stock-limit-up.entity';
import { CreateStockLimitUpDto } from './dto/create-stock-limit-up.dto';
import { UpdateStockLimitUpDto } from './dto/update-stock-limit-up.dto';

@Injectable()
export class StockLimitUpService {
  constructor(
    @InjectRepository(StockLimitUp)
    private readonly stockRepository: Repository<StockLimitUp>,
  ) {}

  createStockLimitUp(createStockLimitUpDto: CreateStockLimitUpDto) {
    const stock: StockLimitUp = new StockLimitUp();
    stock.stockName = createStockLimitUpDto.stockName;
    stock.stockCode = createStockLimitUpDto.stockCode;
    // stock.subSector = createStockLimitUpDto.subSector;
    // stock.mainSector = createStockLimitUpDto.mainSector;
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

  updateStockLimitUp(
    id: number,
    updateStockLimitUpDto: UpdateStockLimitUpDto,
  ): Promise<StockLimitUp> {
    const stock: StockLimitUp = new StockLimitUp();
    stock.stockName = updateStockLimitUpDto.stockName;
    stock.stockCode = updateStockLimitUpDto.stockCode;
    // stock.mainSector = updateStockLimitUpDto.mainSector;
    // stock.subSector = updateStockLimitUpDto.subSector;
    return this.stockRepository.save(stock);
  }

  removeStockLimitUp(stockId: number): Promise<{ affected?: number }> {
    return this.stockRepository.delete(stockId);
  }

  // findAllByAuthor(authorId: string): Promise<StockLimitUp[]> {
  //   return this.stockRepository.find({
  //     where: {
  //       author: {
  //         id: authorId,
  //       },
  //     },
  //   });
  // }

  // async postAuthor(postId: string) {
  //   const post = await this.stockRepository.findOne({
  //     where: {
  //       id: postId,
  //     },
  //     relations: {
  //       author: true,
  //     },
  //   });

  //   return post.author;
  // }
}
