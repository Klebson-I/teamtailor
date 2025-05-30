import { Test, TestingModule } from '@nestjs/testing';
import { TeamtailorController } from './teamtailor.controller';
import { TeamtailorApiHandlerModule } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.module';
import { TeamtailorService } from './teamtailor.service';

describe('TeamtailorController', () => {
  let controller: TeamtailorController;
  let service: TeamtailorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamtailorService],
      controllers: [TeamtailorController],
      imports: [TeamtailorApiHandlerModule]
    }).compile();

    controller = module.get<TeamtailorController>(TeamtailorController);
    service = module.get<TeamtailorService>(TeamtailorService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should call getEmployee method of teamtailor service when getEmployee of controller is called', () => {
    const spyOnService = jest.spyOn(service, 'getEmployee').mockImplementation(async () => {});
    controller.getEmployee();
    expect(spyOnService).toHaveBeenCalled()
  });
});
