export interface IUser {
    name: string;
    email: string;
    password: string;
    companyName: string;
    designation: string;
    intro: string;
    socials: {
        github: string,
        linkedin: string,
        twitter: string,
        other: string,
    }
    profilePic: string;
  }
  
  