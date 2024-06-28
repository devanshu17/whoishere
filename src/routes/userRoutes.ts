import { Router, Request, Response, NextFunction } from 'express';
import * as UserService from '../service/userService';
import authMiddleware, { AuthenticatedRequest } from '../middleware/authMiddleware';
import { upload, uploadBlobFromBuffer, uploadBlobFromLocalPath } from '../utils/blobStorage';

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

// Get current users
router.get('/',authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    res.json(req.user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const users = await UserService.getUser(req.params.userId);
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:userId/events', async (req: Request, res: Response) => {
  try {
    const users = await UserService.getEventsForUser(req.params.userId);
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const users = await UserService.loginUser(req.body.username, req.body.password);
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:userId/profileimage', upload.single("profile"), async (req: Request, res: Response) => {
  const fileBuffer = req.file?.buffer;
  const fileSize = req.file?.size;
  const mimeType = req.file?.mimetype;
  const resp = await uploadBlobFromBuffer(`${req.params.userId}_${req.file?.originalname}`,fileBuffer, fileSize, mimeType);
  res.status(200).send(resp);
});

export default router;

