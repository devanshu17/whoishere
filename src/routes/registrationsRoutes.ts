import { Router, Request, Response } from 'express';
import Registrations from '../models/Registrations';
import { IRegistrations } from '../interfaces/registrations/IRegistrations';
import * as RegistrationsService from '../service/registrationsService';
import path from 'path';
import { config } from '../config/config';
import * as fs from 'fs';

const router: Router = Router();

// Create a new Registration
router.post('/', async (req: Request, res: Response) => {
  try {
    const addedRegistration = await RegistrationsService.addRegistration(req.body);
    res.status(201).json(addedRegistration);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/events/:eventId/users', async (req: Request, res: Response) => {
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
