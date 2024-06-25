import { IUser } from '../users/IUser';
import { UserRoles } from '../../types/userRoles';

export interface IRegistrations{
    user: IUser;
    eventId: string;
    date: Date;
    location: string;
    userRole: UserRoles;
}