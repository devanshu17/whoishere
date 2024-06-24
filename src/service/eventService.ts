import { IEvents } from "../interfaces/events/IEvents";
import Events from "../models/Events";

export async function addEvent(eventInput: Omit<IEvents, '_id'>): Promise<IEvents> {
    try {
      const event = new Events(eventInput);
      const addedEvent = await event.save();
      return addedEvent;
    } catch (error: any) {
      throw new Error(`Error saving user: ${error.message}`);
    }
}

// find all events in the database
export async function fetchAllEvents():Promise<IEvents[]>{
    try{
        const events = await Events.find();
        return events;
    } catch(error: any) {
        throw new Error('Error finding events: $(error.message)');
    }
}