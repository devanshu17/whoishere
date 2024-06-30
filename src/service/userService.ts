import mongoose from "mongoose";
import { IUser } from "../interfaces/users/IUser";
import Registrations from "../models/Registrations";
import User from "../models/User";
import { comparePasswords, hashPassword } from "../utils/hash";
import { isNullOrUndefinedOrEmpty, isTimeValidFromNowFor } from "../utils/utility";
import { IToken } from "../interfaces/tokens/IToken";
import { generateRefreshToken, generateToken, verifyRefreshToken } from "../utils/jwt";
import { uploadBlobFromBuffer } from "../utils/blobStorage";
import { config } from "../config/config";

/**
 * Saves a user to the database.
 * @param userInput - The user data to save.
 * @returns The saved user document.
 */
export async function saveUser(userInput: Omit<IUser, '_id'>): Promise<IUser> {
    try {
      const user = new User(userInput);
      // user.password = await hashPassword(user.password);
      const savedUser = await user.save();
      return savedUser;
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`);
    }
}

/**
 * Gets user by UserId
 * @param userId - userId of the user
 * @returns The user document.
 */
export async function getUser(userId: string): Promise<IUser | null> {
  try {
    return User.findOne({_id: userId}, {password:0}).lean();
  } catch (error: any) {
    throw new Error(`Error saving user: ${error.message}`);
  }
}

export async function getEventsForUser(userId: string) {
  try {
    const registrations = await Registrations.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "events",      
          localField: "eventId", 
          foreignField: "_id",  
          as: "RegisteredEvents"        
        }
      },
      {
        $project: {
          "_id": 0,
          "userRole": 1,
          "registrationDate": 1,
          "registrationId": "$_id",
          "eventInfo": { "$arrayElemAt": [ "$RegisteredEvents", 0 ] } 
        }
      }
    ]);

    if(registrations.length == 0) {
      throw new Error("User not found");
    }
    return registrations;
  } catch (error: any) {
    throw new Error(`Error fetching registered events: ${error.message}`);
  }
}

/**
 * Finds all users in the database.
 * @returns A Promise that resolves to an array of IUser objects.
 */
export async function findUsers(): Promise<IUser[]> {
    try {
      const users = await User.find({},{password: 0});
      return users;
    } catch (error: any) {
      throw new Error(`Error finding users: ${error.message}`);
    }
  }

export async function loginUser(username: string, password: string): Promise<IToken> {
  const user: IUser | null = await User.findOne({email: username, password: password}, { password: 0}).lean();
    
  if(isNullOrUndefinedOrEmpty(user)){
    throw new Error("Invalid Credentials");
  }
  // delete user[password];
  const token: IToken = {
    refreshToken: generateRefreshToken(user),
    authToken: generateToken(user),
  };
  return token;
}

export async function updateProfilePicture(
  userId: string | undefined,
  imageName: string | undefined,
  buffer: Buffer | undefined,
  bufferSize: number | undefined,
  mimeType: string | undefined,
): Promise<IUser> {
  if(!userId){
    throw new Error('Invalid User');
  }
  const profilePic = await uploadBlobFromBuffer(`${userId}_${imageName}`,buffer, bufferSize, mimeType);
  const uploadedProfile = await User.findOneAndUpdate({_id: userId}, { profilePic: profilePic.url}, {new: true});
  if(!uploadedProfile){
    throw new Error('Invalid user');
  }
  // uploadedProfile = Omit<uploadedProfile, 'password'>;
  return uploadedProfile;
}

export async function refreshUserToken(
  token: string
): Promise<IToken>{
  const tokenInfo = await verifyRefreshToken(token);
  const user: IUser | null = await getUser(tokenInfo._id as string);
  const newToken: IToken = {
    authToken: generateToken(user),
    refreshToken: token,
  }

  if(isTimeValidFromNowFor(config.JWT_REFRESH_TOKEN_LIMIT_IN_SEC, tokenInfo.exp)){
    newToken.refreshToken = generateRefreshToken(user);
  }
  return newToken;
}