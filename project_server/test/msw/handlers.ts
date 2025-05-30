import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://test-endpoint/', () => {
    return HttpResponse.json({
        data: {
            testField: true,
        }
    })
  }),
  http.get('http://error/', () => {
    return HttpResponse.json()
  })
];