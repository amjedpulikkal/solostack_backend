interface Istudent {
    _id?: string;
    email:string
    password: string;
    personal_info: {
        userName: string;
        name: string;
        age: number;
        bio: string
        photo: string
    }
    social_links?:{
        linkedin?:string
    }
    account_info?:{
        learningGoals: string;
        completedSessions?: number;
        reviews?: string[];
        skillLevel: "Newcomer" | "Developing" | "Proficient" | "Master";
    }
    wallet: number;
    joinedAt?: Date;
    isBlocked: boolean;

}

export default  Istudent