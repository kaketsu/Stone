import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { TradeDay } from './entities/trade-day.entity';
import { FORMAT } from 'src/utils/constants';
import * as dayjs from 'dayjs';

@Injectable()
export class TradeDayService {
  constructor(
    @InjectRepository(TradeDay)
    private readonly tradeDayRepository: Repository<TradeDay>,
  ) {}

  async isTradeDay(dateString: string) {
    const date = new Date(dayjs(dateString).format(FORMAT));
    const exist = await this.tradeDayRepository.findOne({
      where: {
        date: date,
      },
    });
    if (exist && exist.isTradeDay) {
      return exist;
    }
    return false;
  }

  async initTradeDay() {
    const today = dayjs();

    const exist = await this.tradeDayRepository.findOneBy({
      date: new Date(today.format(FORMAT)),
    });

    if (!exist) {
      const tradeDay = new TradeDay();
      tradeDay.date = new Date(today.format(FORMAT));
      tradeDay.year = today.year();
      tradeDay.month = today.month();
      const dayOfWeek = today.day();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        tradeDay.isTradeDay = false;
      } else {
        tradeDay.isTradeDay = true;
      }

      const recent = await this.tradeDayRepository.findOne({
        where: {
          isTradeDay: true,
          date: Not(IsNull()),
        },
        order: {
          date: 'DESC',
        },
      });

      if (recent) {
        tradeDay.previousTradeDate = recent.date;
      } else {
        tradeDay.previousTradeDate = null;
      }
      await this.tradeDayRepository.save(tradeDay);
    }
  }
}
