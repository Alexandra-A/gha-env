import { test, expect } from '@playwright/test';

import app from '../src/app.js';
import db from '../db/index.js';
import { setupApp } from './helpers/setup-app.js';

test.describe('Events API', () => {
  setupApp(app);

  test.beforeEach(async () => {
    // Clear the events table before each test
    await db.events.clear();
  });

  test('GET /events returns an empty array when there are no events', async ({ request }) => {
    const response = await request.get('/events');
    expect(response.status()).toBe(200);
    const events = await response.json();
    expect(events).toEqual([]);
  });

  test('POST /events creates a new event', async ({ request }) => {
    const newEvent = { name: 'Test Event', date: '2024-07-01' };
    const response = await request.post('/events', { data: newEvent });
    expect(response.status()).toBe(201);
    const createdEvent = await  response.json();
    expect(createdEvent).toHaveProperty('id');
    expect(createdEvent.name).toBe(newEvent.name);
    expect(createdEvent.date).toBe(newEvent.date);
  });
});