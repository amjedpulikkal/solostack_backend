


export interface Imentor {
    _id?:string
    email?: string;
    password: string;
    personal_info: {
        userName: string;
        name: string;
        bio?: string;
        photo?: string;
        skills?: string[]; 
        Communication?: string[]; 
    };
    social_links: {
        linkedin?: string;
    };
    account_info: {
        PreferredMeetingDuration?: number;
        Ratings?: any[]; 
        YearsOfExperience?: number;
        Availability?: [{
            data: (import("mongoose").Document<unknown, {}, Imentor> & Imentor & Required<{ _id: string; }>)[];
            date:Date
            time:Number[]
        }]; 
        Review?: any[]; 
    };
    wallet?: number;
    joinedAt: Date;
    isBlocked?: boolean;    
};











