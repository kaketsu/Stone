import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  createStock(createStockDto: CreateStockDto) {
    const stock: Stock = new Stock();
    stock.stockName = createStockDto.stockName;
    stock.stockCode = createStockDto.stockCode;
    // stock.subSector = createStockDto.subSector;
    // stock.mainSector = createStockDto.mainSector;
    return this.stockRepository.save(stock);
  }

  findAll(): Promise<Stock[]> {
    return this.stockRepository.find();
  }

  findStock(stockId: string): Promise<Stock> {
    return this.stockRepository.findOneBy({ stockId });
  }

  updateStock(id: number, updateStockDto: UpdateStockDto): Promise<Stock> {
    const stock: Stock = new Stock();
    stock.stockName = updateStockDto.stockName;
    stock.stockCode = updateStockDto.stockCode;
    // stock.mainSector = updateStockDto.mainSector;
    // stock.subSector = updateStockDto.subSector;
    return this.stockRepository.save(stock);
  }

  removeStock(stockId: number): Promise<{ affected?: number }> {
    return this.stockRepository.delete(stockId);
  }

  // findAllByAuthor(authorId: string): Promise<Stock[]> {
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
