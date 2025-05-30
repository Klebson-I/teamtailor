import { Test, TestingModule } from '@nestjs/testing';
import { TeamtailorController } from './teamtailor.controller';
import { TeamtailorApiHandlerModule } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.module';
import { TeamtailorService } from './teamtailor.service';

describe('TeamtailorController', () => {
  let controller: TeamtailorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamtailorService],
      controllers: [TeamtailorController],
      imports: [TeamtailorApiHandlerModule]
    }).compile();

    controller = module.get<TeamtailorController>(TeamtailorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
