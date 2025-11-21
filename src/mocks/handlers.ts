import { http, HttpResponse } from 'msw';

export const API_URL = 'http://localhost:5000/api';

export const handlers = [
  http.post(`${API_URL}/users`, () => new HttpResponse(null, { status: 201 })),
  http.post(`${API_URL}/login`, () => HttpResponse.json({ token: 'killua-zoldyck' })),
];
