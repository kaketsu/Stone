import { Test, TestingModule } from '@nestjs/testing';
import { TradeDayService } from './trade-day.service';

describe('TradeDayService', () => {
  let service: TradeDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeDayService],
    }).compile();

    service = module.get<TradeDayService>(TradeDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
