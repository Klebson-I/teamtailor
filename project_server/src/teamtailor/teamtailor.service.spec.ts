import { Test, TestingModule } from '@nestjs/testing';
import { TeamtailorService } from './teamtailor.service';
import { TeamtailorApiHandler } from 'src/classes/TeamtailorApiHandler/TeamtailorApiHandler.service';

const mockApiPaginatedResponseUser = {
  data: [
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
  ],
  links: {}
};

const expectedUser = [
  {
    candidate_id: '123',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    job_application_id_list: ['job123']
  }
];

const mockApiPaginatedResponseNoJob = {
  data: [
    {
      id: '124',
      attributes: {
        'first-name': 'Jane',
        'last-name': 'Smith',
        email: 'jane.smith@example.com'
      },
      relationships: {}
    }
  ],
  links: {}
};

const expectedNoJobUser = [
  {
    candidate_id: '124',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    job_application_id_list: []
  }
];

const mockApiApplications = {
  data: [
    {
      id: 'job123',
      attributes: {
        'created-at': '2023-01-01'
      }
    }
  ],
  links: {}
};

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

  describe('getEmployeeData', () => {
    it('should fetch and map candidate data with job application', async () => {
      apiHandlerMock.getData.mockResolvedValueOnce(mockApiPaginatedResponseUser);
      const result = await service.getEmployeeData();
      expect(result).toEqual(expectedUser);
    });

    it('should fetch and map candidate data without job application', async () => {
      apiHandlerMock.getData.mockResolvedValueOnce(mockApiPaginatedResponseNoJob);
      const result = await service.getEmployeeData();
      expect(result).toEqual(expectedNoJobUser);
    });
  });

  describe('getAllApplications', () => {
    it('should fetch and map application data', async () => {
      apiHandlerMock.getData.mockResolvedValueOnce(mockApiApplications);
      const result = await service.getAllApplications();
      expect(result).toEqual([
        {
          id: 'job123',
          createdAt: '2023-01-01'
        }
      ]);
    });
  });

  describe('findUserApplication', () => {
    it('should find matching application by id', () => {
      const result = service.findUserApplication('job123', [
        { id: 'job123', createdAt: '2023-01-01' }
      ]);
      expect(result).toBe('2023-01-01');
    });

    it('should return null if no match found', () => {
      const result = service.findUserApplication('job999', [
        { id: 'job123', createdAt: '2023-01-01' }
      ]);
      expect(result).toBeNull();
    });
  });
});
