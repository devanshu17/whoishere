import { IUser } from "../interfaces/users/IUser";
import User from "../models/User";

/**
 * Saves a user to the database.
 * @param userInput - The user data to save.
 * @returns The saved user document.
 */
export async function saveUser(userInput: Omit<IUser, '_id'>): Promise<IUser> {
    try {
      const user = new User(userInput);
      const savedUser = await user.save();
      return savedUser;
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`);
    }
}

/**
 * Finds all users in the database.
 * @returns A Promise that resolves to an array of IUser objects.
 */
export async function findUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new Error(`Error finding users: ${error.message}`);
    }
  }