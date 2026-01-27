import { Router } from 'express';

import { db } from '../data/database.js';

const router = Router();

router.get('/events', async (req, res) => {
  try {
    const client = await db.connectToDatabase();
    const eventsCollection = client.db().collection('events');
    const events = await eventsCollection.find().toArray();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Fetching events failed.' });
  }
});

router.post('/events', async (req, res) => {
  const newEvent = req.body;

  try {
    const client = await db.connectToDatabase();
    const eventsCollection = client.db().collection('events');
    const result = await eventsCollection.insertOne(newEvent);
    res.status(201).json({ message: 'Event created!', eventId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Creating event failed.' });
  }
});

export default router;