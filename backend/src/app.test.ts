import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

describe('GET /api/health', () => {
  it('returns ok when the database is up', async () => {
    const res = await request(createApp({ dbReady: () => true })).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', db: 'up' });
  });

  it('returns 503 when the database is down', async () => {
    const res = await request(createApp({ dbReady: () => false })).get('/api/health');
    expect(res.status).toBe(503);
    expect(res.body).toEqual({ status: 'degraded', db: 'down' });
  });

  it('reports the real connection state by default (no database in tests)', async () => {
    const res = await request(createApp()).get('/api/health');
    expect(res.status).toBe(503);
  });
});
