import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { IUser } from '../interfaces/users/IUser';
import { IDecodedToken } from '../interfaces/tokens/IDecodedToken';

const JWT_TOKEN_SECRET = config.JWT_TOKEN_SECRET;
const JWT_TOKEN_EXPIRY = config.JWT_TOKEN_EXPIRY;
const JWT_REFRESH_SECRET = config.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRY = config.JWT_REFRESH_EXPIRY;

export const generateToken = (user: Omit<IUser,'password'> | null): string => {
    if(user == null) throw new Error('Invalid User object passed');
    return jwt.sign(user, JWT_TOKEN_SECRET, {
        expiresIn: JWT_TOKEN_EXPIRY,
    });
};

export const generateRefreshToken = (user: Omit<IUser,'password'> | null): string => {
    if(user == null) throw new Error('Invalid User object passed');
    return jwt.sign(user, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRY,
    });
};


export const verifyToken = (token: string) : IDecodedToken => {
    return jwt.verify(token, JWT_TOKEN_SECRET) as IDecodedToken;
};

export const verifyRefreshToken = (token: string) : IDecodedToken => {
    return jwt.verify(token, JWT_REFRESH_SECRET) as IDecodedToken;
};