import { IUser } from '../users/IUser';
import { UserRoles } from '../../types/userRoles';

export interface IRegistrations{
    userId: string;
    eventId: string;
    date: Date;
    location: string;
    userRole: UserRoles;
}