
// import { Imentor } from "@entities/mentor";

// import mentorCollection from "../../mongodb/model/mentorSchema"

// import { ImentorRepository } from "../../../usecases/interfaces/repositroey/ImentorRepository";

// export class mentorRepository implements ImentorRepository {


//     async ifUserExist(email: string): Promise<boolean> {
//         const isExist = await mentorCollection.findOne({ email })

//         return isExist ? true : false
//     }

//     async newmentor(mentor: { email: string, name: string, password?: string, photos?: string }): Promise<Imentor> {

//         const Mentor: Imentor = {
//             email: mentor.email,
//             password: mentor.password || "",
//             personal_info: {
//                 userName: "",
//                 name: mentor.name,
//                 bio: "",
//                 photo: mentor.photos || ""
//             },
//             wallet: 0,
//             isBlocked: false,
//             social_links: {
//                 linkedin: ""
//             },
//             account_info: {
//                 PreferredMeetingDuration: 0,
//                 Ratings: [],
//                 YearsOfExperience: 0,
//                 Availability: [],
//                 Review: []
//             },
//             joinedAt: undefined
//         }

//         const newMentor = await mentorCollection.create(Mentor)
//         return newMentor
//     }
//     async upsertmentor(mentor: { email: string, name: string, password?: string, photos?: string }): Promise<Imentor> {

//         const mentor = {
//             email: mentor.email,
//             password: mentor.password || "",
//             personal_info: {
//                 userName: "",
//                 name: mentor.name,
//                 age: 0,
//                 bio: "",
//                 photo: mentor.photos || ""
//             },
//             wallet: 0,
//             isBlocked: false
//         }
//         const newmentor = await mentorCollection.findOneAndUpdate(
//             { email: mentor.email },
//             { $set: mentor }, 
//             { upsert: true, new: true }
//         );
//         return newmentor
//     }

//     async findUserWithEmail(email: string): Promise<Imentor> {

//         const mentor = await mentorCollection.findOne({ email })

//         return mentor!
//     }

//     async findById(_id:string):Promise<Imentor> {
//         return await mentorCollection.findById(_id) as Imentor
//     }

// }