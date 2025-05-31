import { TeamtailorApiHandler } from './TeamtailorApiHandler.service';
import { server } from '../../../test/msw/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TeamtailorApiHandler', () => {
  it('Should return json data from endpoint', async () => {
    const service = new TeamtailorApiHandler();
    const result = await service.getData<{ message: string }>(
      'http://test-endpoint/',
      'GET'
    );

    expect(result).toEqual({ data: { testField: true }});
  });

  it('Should return empty object when json is empty', async () => {
    const service = new TeamtailorApiHandler();
    const result = await service.getData<{ message: string }>(
      'http://error/',
      'GET'
    );
    expect(result).toEqual({})
  })
});