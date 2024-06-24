import { Router, Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../interfaces/users/IUser';
import * as UserService from '../service/userService';

const router: Router = Router();

// Create a new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const savedUser = await UserService.saveUser(req.body);
    res.status(201).json(savedUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, { __v: 0 }).lean<Omit<IUser, '_id'>>();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
