import { IUser } from "../users/IUser";

export interface IDecodedToken extends IUser {
  exp: number;  // Expiry time in seconds since the epoch
  iat: number;  // Issued at time in seconds since the epoch
}