import { Test, TestingModule } from '@nestjs/testing';
import { OurFeaturedProductService } from './our-featured-product.service';

describe('OurFeaturedProductService', () => {
  let service: OurFeaturedProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OurFeaturedProductService],
    }).compile();

    service = module.get<OurFeaturedProductService>(OurFeaturedProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
