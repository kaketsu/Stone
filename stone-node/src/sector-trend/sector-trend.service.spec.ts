import { Test, TestingModule } from '@nestjs/testing';
import { SectorTrendService } from './sector-trend.service';

describe('SectorTrendService', () => {
  let service: SectorTrendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectorTrendService],
    }).compile();

    service = module.get<SectorTrendService>(SectorTrendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
