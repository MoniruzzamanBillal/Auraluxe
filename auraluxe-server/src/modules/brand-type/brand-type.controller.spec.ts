import { Test, TestingModule } from '@nestjs/testing';
import { BrandTypeController } from './brand-type.controller';

describe('BrandTypeController', () => {
  let controller: BrandTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandTypeController],
    }).compile();

    controller = module.get<BrandTypeController>(BrandTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
