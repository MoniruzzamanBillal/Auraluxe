import { Test, TestingModule } from '@nestjs/testing';
import { HomeOurFeaturedService } from './home-our-featured.service';

describe('HomeOurFeaturedService', () => {
  let service: HomeOurFeaturedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeOurFeaturedService],
    }).compile();

    service = module.get<HomeOurFeaturedService>(HomeOurFeaturedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
