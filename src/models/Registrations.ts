import mongoose, { Document, Schema } from 'mongoose';
import { IRegistrations } from '../interfaces/registrations/IRegistrations';
import { UserRoles } from '../types/userRoles';

const RegistrationsSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true},
    location: { type: String, required: true },
    userRole: { type: String, enum: Object.values(UserRoles), required: true },
});

RegistrationsSchema.index({ eventId: 1, userId: 1 }, { unique: true })

const Registrations = mongoose.model<IRegistrations & mongoose.Document>('Registrations', RegistrationsSchema);
export default Registrations;
