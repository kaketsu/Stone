import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StockLimitUpStatistics } from './entities/stock-limit-up-statistics.entity';
import * as dayjs from 'dayjs';

import { StockLimitUpService } from 'src/stock-limit-up/stock-limit-up.service';
import { FORMAT } from 'src/utils/constants';

@Injectable()
export class StockLimitUpStatisticsService {
  constructor(
    @InjectRepository(StockLimitUpStatistics)
    private readonly stockLimitUpStatisticsRepository: Repository<StockLimitUpStatistics>,
    private readonly stockLimitUpService: StockLimitUpService,
  ) {}

  async createStockLimitUpStatistics(dateCurrent: Date) {
    const exist = await this.stockLimitUpStatisticsRepository.findOneBy({
      date: dateCurrent,
    });

    if (exist) {
      await this.stockLimitUpStatisticsRepository.delete({ date: dateCurrent });
    }

    const stockLimitUpStatistics: StockLimitUpStatistics =
      new StockLimitUpStatistics();
    stockLimitUpStatistics.date = dateCurrent;
    const todayStocks =
      await this.stockLimitUpService.findStockLimitUpByDate(dateCurrent);

    const dateBefore = new Date(
      dayjs(dateCurrent).subtract(1, 'day').format(FORMAT),
    );

    const yesterdayStocks =
      await this.stockLimitUpService.findStockLimitUpByDate(dateBefore);

    const stocksBoth = [];
    for (let i = 0; i < yesterdayStocks.length; i++) {
      const exist = todayStocks.find(
        (st) => st.stockCode === yesterdayStocks[i].stockCode,
      );

      if (exist) {
        stocksBoth.push(exist);
      }
    }

    const level1 = todayStocks.filter((st) => st.limitUpLevel === 1)?.length;
    stockLimitUpStatistics.limitUpLevel1 = level1;
    stockLimitUpStatistics.limitUpLevel1Percentage = 0;

    const levelMore = stocksBoth.filter((st) => st.limitUpLevel > 8)?.length;
    const level8Yesterday = yesterdayStocks.filter(
      (st) => st.limitUpLevel === 8,
    )?.length;
    stockLimitUpStatistics.limitUpLevelMore = levelMore;
    if (level8Yesterday === 0) {
      stockLimitUpStatistics.limitUpLevelMorePercentage = 0;
    } else {
      const num = levelMore / level8Yesterday;
      stockLimitUpStatistics.limitUpLevelMorePercentage = parseFloat(
        num.toFixed(4),
      );
    }

    for (let degree = 2; degree < 8; degree++) {
      const level = stocksBoth.filter(
        (st) => st.limitUpLevel === degree,
      )?.length;
      const levelYesterday = yesterdayStocks.filter(
        (st) => st.limitUpLevel === degree - 1,
      )?.length;
      stockLimitUpStatistics[`limitUpLevel${degree}`] = level;

      if (levelYesterday === 0) {
        stockLimitUpStatistics[`limitUpLevel${degree}Percentage`] = 0;
      } else {
        const num = level / levelYesterday;
        stockLimitUpStatistics[`limitUpLevel${degree}Percentage`] = parseFloat(
          num.toFixed(4),
        );
      }
    }

    console.log(stockLimitUpStatistics);

    return this.stockLimitUpStatisticsRepository.save(stockLimitUpStatistics);
  }

  findOneByDate(dateString: string): Promise<StockLimitUpStatistics> {
    const date = new Date(dayjs(dateString).format(FORMAT));
    return this.stockLimitUpStatisticsRepository.findOneBy({ date });
  }

  deleteOneByDate(dateString: string): Promise<any> {
    const date = new Date(dayjs(dateString).format(FORMAT));
    return this.stockLimitUpStatisticsRepository.delete({ date });
  }

  findAll(): Promise<StockLimitUpStatistics[]> {
    return this.stockLimitUpStatisticsRepository.find({
      order: {
        date: 'ASC', // 或者 'ASC' 进行升序排序
      },
    });
  }

  save(statistics): Promise<StockLimitUpStatistics> {
    return this.stockLimitUpStatisticsRepository.save(statistics);
  }
}
