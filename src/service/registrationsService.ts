import mongoose from "mongoose";
import { IRegistrations } from "../interfaces/registrations/IRegistrations";
import Registrations from "../models/Registrations";
import { IRegisteredUsers } from "../interfaces/registrations/IRegisteredUsers";

export async function addRegistration(RegistrationInput: Omit<IRegistrations, '_id'>): Promise<IRegistrations> {
    try {
      const registration = new Registrations(RegistrationInput);
      const addedRegistration = await registration.save();
      return addedRegistration;
    } catch (error: any) {
      throw new Error(`Error saving Registration: ${error.message}`);
    }
}

export async function getUsersAttendingEvent(eventId: string): Promise<IRegisteredUsers[]> {
    try {
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            throw new Error('Invalid Event ID format');
          }

        const registrations = await Registrations.aggregate([
          {
            $match: {
              eventId: new mongoose.Types.ObjectId(eventId),
            },
          },
          {
            $lookup: {
              from: "users",      
              localField: "userId", 
              foreignField: "_id",  
              as: "UserInfo"        
            }
          },
          {
            $unwind: "$UserInfo" 
          },
          {
            $project: {
              _id: 0,
              registrationId: "$_id",
              eventId: 1,
              userId: 1,
              registrationDate: "$date",
              userRole: 1,
              "UserInfo.name": 1,
              "UserInfo.email": 1,
              "UserInfo.socials": 1,
            }
          },
        ]);
          
      return registrations;
    } catch (error: any) {
        throw new Error(`Failed to get users attending event ${eventId}: ${error.message}`);
    }
}


