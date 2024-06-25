import mongoose from "mongoose";
import { IRegistrations } from "../interfaces/registrations/IRegistrations";
import { IUser } from "../interfaces/users/IUser";
import Registrations from "../models/Registrations";
import User from "../models/User";
import { config } from "../config/config";
import { isNullOrUndefinedOrEmpty } from "../utils/utility";
import path from "path";

export async function addRegistration(RegistrationInput: Omit<IRegistrations, '_id'>): Promise<IRegistrations> {
    try {
      const registration = new Registrations(RegistrationInput);
      const addedRegistration = await registration.save();
      return addedRegistration;
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`);
    }
}

export async function getUsersAttendingEvent(eventId: string): Promise<IUser[]> {
    try {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            throw new Error('Invalid Event ID format');
          }
        // Find registrations for the given event
        const registrations = await Registrations.find({ eventId }).exec();

        // Extract user IDs from registrations
        const userIds = registrations.map(registration => registration.user);

        // Find users based on the extracted IDs
        const users = await User.find({ _id: { $in: userIds } }).exec();
        return users;

        // alter approach, not sure
        // const registrations = await Registrations.find({ eventid: eventId }).populate('user');
        // return registrations.map(registration => registration.user);
    } catch (error: any) {
        throw new Error(`Failed to get users attending event ${eventId}: ${error.message}`);
    }
}


