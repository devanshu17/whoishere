import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from '../interfaces/users/IUser';

const SocialsSchema = new Schema({
  linkedin: { type: String, required: false },
  github: { type: String, required: false },
  twitter: { type: String, required: false },
  other: { type: String, required: false }
});

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socials: SocialsSchema,
});

const User = mongoose.model<IUser & mongoose.Document>('User', UserSchema);
export default User;
