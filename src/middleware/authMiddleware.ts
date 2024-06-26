import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { isNullOrUndefinedOrEmpty } from '../utils/utility';
import { verifyToken } from '../utils/jwt';

const secret = config.JWT_TOKEN_SECRET;

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = String(req.headers['x-auth-token'] || '');

  if (isNullOrUndefinedOrEmpty(token)) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try{
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch(error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

export default authMiddleware;
