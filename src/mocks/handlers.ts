import { http, HttpResponse } from 'msw';

export const API_URL = 'http://localhost:5000/api';

export const handlers = [
  http.post(`${API_URL}/users`, () => new HttpResponse(null, { status: 201 })),
  http.post(`${API_URL}/auth/login`, () =>
    HttpResponse.json({
      user: {
        id: '1',
        fullName: 'Killua Zoldyck',
        email: 'killua.zoldyck@email.com',
        birthDate: '10-10-2000',
      },
    })
  ),
];
