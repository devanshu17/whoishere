import { Router, Request, Response } from 'express';
import Events from '../models/Events';
import { IEvents } from '../interfaces/events/IEvents';
import * as EventService from '../service/eventService';

const router: Router = Router();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const addedEvent = await EventService.addEvent(req.body);
    res.status(201).json(addedEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await Events.find({}, { __v: 0 }).lean<Omit<IEvents, '_id'>>();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
