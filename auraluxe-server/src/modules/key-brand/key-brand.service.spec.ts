import { Test, TestingModule } from '@nestjs/testing';
import { KeyBrandService } from './key-brand.service';

describe('KeyBrandService', () => {
  let service: KeyBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyBrandService],
    }).compile();

    service = module.get<KeyBrandService>(KeyBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
