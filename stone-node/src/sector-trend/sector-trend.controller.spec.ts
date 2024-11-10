import { Test, TestingModule } from '@nestjs/testing';
import { SectorTrendController } from './sector-trend.controller';

describe('SectorTrendController', () => {
  let controller: SectorTrendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectorTrendController],
    }).compile();

    controller = module.get<SectorTrendController>(SectorTrendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
