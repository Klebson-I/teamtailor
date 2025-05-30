import { Test, TestingModule } from '@nestjs/testing';
import { TeamtailorService } from './teamtailor.service';
import { TeamtailorApiHandler } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.service';

const mockApiResponseUser = [
  {
    id: '123',
    attributes: {
      'first-name': 'John',
      'last-name': 'Doe',
      email: 'john.doe@example.com'
    },
    relationships: {
      'job-applications': {
        data: [{ id: 'job123' }]
      }
    }
  }
];

const expectedUser = [
  {
    candidate_id: '123',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    job_application_id: 'job123'
  }
]

const mockApiResponseNoJob = [
  {
    id: '124',
    attributes: {
      'first-name': 'Jane',
      'last-name': 'Smith',
      email: 'jane.smith@example.com'
    },
    relationships: {}
  }
];

const expectedNoJobUser = [
        {
          candidate_id: '124',
          first_name: 'Jane',
          last_name: 'Smith',
          email: 'jane.smith@example.com',
          job_application_id: undefined
        }
      ]

const mockApiApplication = {
  attributes: {
    'created-at': '2023',
  }
}

describe('TeamtailorService', () => {
  let service: TeamtailorService;
  let apiHandlerMock: jest.Mocked<TeamtailorApiHandler>;

  beforeEach(async () => {
    const mockApiHandler = {
      getData: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamtailorService,
        { provide: TeamtailorApiHandler, useValue: mockApiHandler },
      ],
    }).compile();

    service = module.get<TeamtailorService>(TeamtailorService);
    apiHandlerMock = module.get(TeamtailorApiHandler);
  });

  describe('Test getEmployeeData method', () => {
    it('Should fetch and map candidate data when its found in API', async () => {
      apiHandlerMock.getData.mockResolvedValue(mockApiResponseUser);
      const result = await service.getEmployeeData();
      expect(result).toEqual(expectedUser);
    });

    it('Should fetch and map candidate data when its found in API and it has not application', async () => {
      apiHandlerMock.getData.mockResolvedValue(mockApiResponseNoJob);
      const result = await service.getEmployeeData();
      expect(result).toEqual(expectedNoJobUser);
    });
  })

  describe('Test getApplicationData method', () => {
    it('Should fetch and return creation date of application when its found in API', async () => {
      apiHandlerMock.getData.mockResolvedValue(mockApiApplication);
      const result = await service.getApplicationData('id');
      expect(result).toEqual('2023');
    });
    it('Should throw when application is not found', async () => {
      apiHandlerMock.getData.mockResolvedValue({});
      const call = async() => await service.getApplicationData('id');
      expect(call).rejects.toThrow();
    });
  })
});
