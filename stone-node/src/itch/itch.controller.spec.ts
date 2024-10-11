import { Test, TestingModule } from '@nestjs/testing';
import { ItchController } from './itch.controller';

describe('ItchController', () => {
  let controller: ItchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItchController],
    }).compile();

    controller = module.get<ItchController>(ItchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
