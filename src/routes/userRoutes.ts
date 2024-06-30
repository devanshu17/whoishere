import { Router, Request, Response, NextFunction } from 'express';
import * as UserService from '../service/userService';
import authMiddleware, { AuthenticatedRequest } from '../middleware/authMiddleware';
import { upload, uploadBlobFromBuffer, uploadBlobFromLocalPath } from '../utils/blobStorage';
import { updateProfilePicture } from '../service/userService';

const router: Router = Router();

// Create a new user
router.post('/',upload.single("profileImg"), async (req: Request, res: Response) => {
  try {
    let savedUser = await UserService.saveUser(req.body);
    const userId = savedUser._id;
    if(req.file){
      const fileBuffer = req.file?.buffer;
      const fileSize = req.file?.size;
      const mimeType = req.file?.mimetype;
      // const resp = await updateProfilePicture(`${req.params.userId}_${req.file?.originalname}`,fileBuffer, fileSize, mimeType);
      savedUser = await updateProfilePicture(userId, req.file?.originalname,fileBuffer, fileSize, mimeType);
      console.log(`Profile Image successfully uploaded.`, {userId, savedUser});
    }
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
    // console.log('Login user',req.body);
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
  // const resp = await updateProfilePicture(`${req.params.userId}_${req.file?.originalname}`,fileBuffer, fileSize, mimeType);
  const resp = await updateProfilePicture(req.params.userId, req.file?.originalname,fileBuffer, fileSize, mimeType);
  res.status(200).send(resp);
});

router.post('/refreshToken', async (req: Request, res: Response) => {
  try{
    const refreshToken = req.body.token;
    const newToken = await UserService.refreshUserToken(refreshToken);
    res.status(200).json(newToken);
  } catch (e: any) {
    console.error(e);
    res.status(401).json({msg: e.message});
  }
});

export default router;

