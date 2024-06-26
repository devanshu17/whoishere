import { Router, Request, Response } from 'express';
import Events from '../models/Events';
import { IEvents } from '../interfaces/events/IEvents';
import * as EventService from '../service/eventService';
import path from 'path';
import { config } from '../config/config';
import * as fs from 'fs';
import * as RegistrationsService from '../service/registrationsService';

const router: Router = Router();

// Create a new Event
router.post('/', async (req: Request, res: Response) => {
  try {
    const addedEvent = await EventService.addEvent(req.body);
    res.status(201).json(addedEvent);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const event =  await EventService.getEvent(req.params.id);
    if(event == null){
      res.status(404).json({msg: "Event not found"});
    } else {
      res.status(200).json(event);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/qr', async (req: Request, res: Response) => {
  try {
    const event =  await EventService.generateQrForEvent(req.params.id);
    res.status(200).json(event);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/:eventId/qr', async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const qrPath: string = path.join(config.DATA_PATH,`${eventId}.png`);
    var stat = fs.statSync(qrPath);
    res.writeHead(200, {
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(qrPath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
});

// Get all Events
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await Events.find({}, { __v: 0 }).lean<Omit<IEvents, '_id'>>();
    res.json(events);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new Registration
router.post('/register/user', async (req: Request, res: Response) => {
  try {
    const addedRegistration = await RegistrationsService.addRegistration(req.body);
    res.status(201).json(addedRegistration);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:eventId/users', async (req: Request, res: Response) => {
  try {
    const event =  await RegistrationsService.getUsersAttendingEvent(req.params.eventId);
    if(event == null){
      res.status(404).json({msg: "Event not found"});
    } else {
      res.status(200).json(event);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
