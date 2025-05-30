import { TeamtailorApiHandler } from './TeamtailorApiHandler.service';
import { server } from '../../../test/msw/server';
import { ApiError } from 'src/filters/GlobalFilter/types';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TeamtailorApiHandler', () => {
  it('Should return data field of response when it exist', async () => {
    const service = new TeamtailorApiHandler();
    const result = await service.getData<{ message: string }>(
      'http://test-endpoint/',
      'GET'
    );

    expect(result).toEqual({ testField: true });
  });

  it('Should throw Api error when response json is empty', async () => {
    const service = new TeamtailorApiHandler();
    const call = async () => await service.getData<{ message: string }>(
      'http://error/',
      'GET'
    );
    expect(call).rejects.toThrow(ApiError)
  })
});