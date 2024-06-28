import mongoose from "mongoose";
import { IUser } from "../interfaces/users/IUser";
import Registrations from "../models/Registrations";
import User from "../models/User";
import { comparePasswords, hashPassword } from "../utils/hash";
import { isNullOrUndefinedOrEmpty } from "../utils/utility";
import { IToken } from "../interfaces/tokens/IToken";
import { generateRefreshToken, generateToken } from "../utils/jwt";

/**
 * Saves a user to the database.
 * @param userInput - The user data to save.
 * @returns The saved user document.
 */
export async function saveUser(userInput: Omit<IUser, '_id'>): Promise<IUser> {
    try {
      // console.log(userInput);
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
    return User.findOne({_id: userId}, {password:0}).exec();
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