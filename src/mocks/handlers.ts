import { http, HttpResponse } from 'msw';

export const API_URL = 'http://localhost:5000/api';

export const handlers = [
  http.post(`${API_URL}/users`, () => new HttpResponse(null, { status: 201 })),
  http.post(`${API_URL}/auth/login`, () =>
    HttpResponse.json(
      {
        id: '1',
        fullName: 'Killua Zoldyck',
        email: 'killua.zoldyck@email.com',
        birthDate: '10-10-2000',
        avatar: 'avatar-killua',
      },
      { status: 200 }
    )
  ),
  http.patch(`${API_URL}/users/me`, () => new HttpResponse(null, { status: 200 })),
  http.patch(`${API_URL}/users/me/password`, () => new HttpResponse(null, { status: 200 })),
  http.get(`${API_URL}/users/me`, () =>
    HttpResponse.json({
      id: '1',
      fullName: 'Killua Zoldyck',
      email: 'killua.zoldyck@email.com',
      birthDate: '10-10-2000',
      avatar: 'avatar-killua',
    })
  ),
];
