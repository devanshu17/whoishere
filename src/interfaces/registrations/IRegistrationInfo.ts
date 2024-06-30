import { IEvents } from "../events/IEvents";
import { IUser } from "../users/IUser";
import { IRegistrations } from "./IRegistrations";

export interface IRegistrationInfo {
    userInfo?: IUser | null ,
    eventInfo?: IEvents | null ,
    registrationInfo?: IRegistrations | null 
}