import { Test, TestingModule } from '@nestjs/testing';
import { OurFeaturedProductController } from './our-featured-product.controller';

describe('OurFeaturedProductController', () => {
  let controller: OurFeaturedProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OurFeaturedProductController],
    }).compile();

    controller = module.get<OurFeaturedProductController>(OurFeaturedProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
