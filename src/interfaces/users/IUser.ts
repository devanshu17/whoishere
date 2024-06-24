export interface IUser {
    name: string;
    email: string;
    password: string;
    social: {
        github: string,
        linkedin: string,
        twitter: string,
        other: string,
    }
  }
  
  