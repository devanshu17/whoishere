import mongoose from "mongoose";
import { IEvents } from "../interfaces/events/IEvents";
import Events from "../models/Events";
import { generateEventUrlForQr, generateQRCode } from "../utils/qr";
import { config } from "../config/config";
import { isNullOrUndefinedOrEmpty } from "../utils/utility";
import path from "path";
import { uploadBlobFromLocalPath } from "../utils/blobStorage";

export async function addEvent(eventInput: Omit<IEvents, '_id'>): Promise<IEvents> {
    try {
      const event = new Events(eventInput);
      const addedEvent = await event.save();
      return addedEvent;
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`);
    }
}

export async function getEvent(eventId: string): Promise<IEvents | null> {
  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    throw new Error('Invalid ID format');
  }
  const event = await Events.findOne({_id: eventId}).exec();
  return event;
}

export async function generateQrForEvent(eventId: string): Promise<IEvents| null> {
  const event = await getEvent(eventId);
  if(isNullOrUndefinedOrEmpty(event)){
    throw new Error('Event not found.');
  }
  const qrUrl: string = generateEventUrlForQr(eventId);
  const qrName: string = `${eventId}.png`;
  const uploadedQrLink = await generateQRCode(qrUrl, qrName);
  return Events.findOneAndUpdate({_id: eventId}, {qrlink: uploadedQrLink.url}, { new: true });
}

// find all events in the database
export async function fetchAllEvents():Promise<IEvents[]>{
    try{
        const events = await Events.find();
        return events;
    } catch(error: any) {
        throw new Error(`Error finding events: ${error.message}`);
    }
}