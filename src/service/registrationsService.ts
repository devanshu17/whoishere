import mongoose from "mongoose";
import { IRegistrations } from "../interfaces/registrations/IRegistrations";
import Registrations from "../models/Registrations";
import { IRegisteredUsers } from "../interfaces/registrations/IRegisteredUsers";
import { getEvent } from "./eventService";
import { IRegistrationInfo } from "../interfaces/registrations/IRegistrationInfo";

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
              "UserInfo.companyName": 1,
              "UserInfo.designation": 1,
              "UserInfo.intro": 1,
              "UserInfo.socials": 1,
              "UserInfo.profilePic": 1,
            }
          },
        ]);
          
      return registrations;
    } catch (error: any) {
        throw new Error(`Failed to get users attending event ${eventId}: ${error.message}`);
    }
}

export async function getRegistrationInfoOfUserForEvent(eventId: string, userId: string): Promise<IRegistrationInfo> {
  const eventInfo = await getEvent(eventId);
  if(!eventInfo){
    throw new Error('Event Not Found');
  }
  const registrationInfo = await Registrations.findOne({eventId: eventId, userId: userId}).exec();
  return {
    eventInfo,
    registrationInfo
  }
}


