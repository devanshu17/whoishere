import mongoose, { Document, Schema } from 'mongoose';
import { IRegistrations } from '../interfaces/registrations/IRegistrations';
import { UserRoles } from '../types/userRoles';

const RegistrationsSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventid: { type: String, required: true },
    date: { type: Date, required: true},
    location: { type: String, required: true },
    userRole: { type: String, enum: Object.values(UserRoles), required: true },
});

const Registrations = mongoose.model<IRegistrations & mongoose.Document>('Registrations', RegistrationsSchema);
export default Registrations;