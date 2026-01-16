import { Test, TestingModule } from '@nestjs/testing';
import { BrandTypeService } from './brand-type.service';

describe('BrandTypeService', () => {
  let service: BrandTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandTypeService],
    }).compile();

    service = module.get<BrandTypeService>(BrandTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
