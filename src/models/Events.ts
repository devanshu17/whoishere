import mongoose, { Document, Schema } from 'mongoose';
import { IEvents } from '../interfaces/events/IEvents';

const EventSchema: Schema = new Schema({
  qrlink: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true, unique: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: false },
  websiteURL: { type: String, required:false },
});

const Events = mongoose.model<IEvents & mongoose.Document>('Events', EventSchema);
export default Events;
