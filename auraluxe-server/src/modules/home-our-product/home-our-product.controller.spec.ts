import { Test, TestingModule } from '@nestjs/testing';
import { HomeOurProductController } from './home-our-product.controller';

describe('HomeOurProductController', () => {
  let controller: HomeOurProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeOurProductController],
    }).compile();

    controller = module.get<HomeOurProductController>(HomeOurProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
