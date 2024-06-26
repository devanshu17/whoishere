import { IUser } from '../users/IUser';
import { UserRoles } from '../../types/userRoles';

export interface IRegisteredUsers{
    userId: string;
    eventId: string;
    registrationId: string;
    registrationDate: Date;
    userRole: UserRoles;
    userInfo: Omit<IUser, 'password'>
}