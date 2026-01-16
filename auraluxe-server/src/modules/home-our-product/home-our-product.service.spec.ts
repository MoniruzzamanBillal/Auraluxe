import { Test, TestingModule } from '@nestjs/testing';
import { HomeOurProductService } from './home-our-product.service';

describe('HomeOurProductService', () => {
  let service: HomeOurProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeOurProductService],
    }).compile();

    service = module.get<HomeOurProductService>(HomeOurProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
