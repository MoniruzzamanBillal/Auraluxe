import { Test, TestingModule } from '@nestjs/testing';
import { HomeOurFeaturedController } from './home-our-featured.controller';

describe('HomeOurFeaturedController', () => {
  let controller: HomeOurFeaturedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HomeOurFeaturedController],
    }).compile();

    controller = module.get<HomeOurFeaturedController>(HomeOurFeaturedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
