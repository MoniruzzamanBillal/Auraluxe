import { Test, TestingModule } from '@nestjs/testing';
import { KeyBrandController } from './key-brand.controller';

describe('KeyBrandController', () => {
  let controller: KeyBrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyBrandController],
    }).compile();

    controller = module.get<KeyBrandController>(KeyBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
