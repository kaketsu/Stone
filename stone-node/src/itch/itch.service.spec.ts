import { Test, TestingModule } from '@nestjs/testing';
import { ItchService } from './itch.service';

describe('ItchService', () => {
  let service: ItchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItchService],
    }).compile();

    service = module.get<ItchService>(ItchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
