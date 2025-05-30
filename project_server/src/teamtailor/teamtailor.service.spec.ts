import { Test, TestingModule } from '@nestjs/testing';
import { TeamtailorService } from './teamtailor.service';
import { TeamtailorApiHandlerModule } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.module';

describe('TeamtailorService', () => {
  let service: TeamtailorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamtailorService],
      imports: [TeamtailorApiHandlerModule]
    }).compile();

    service = module.get<TeamtailorService>(TeamtailorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
