import mentorCollection from "../../mongodb/model/mentorSchema"
import { Imentor } from "@entities/mentor"
import { ImentorRepository } from "@interfaces/repositroey/ImentorRepository"


export class MentorRepository implements ImentorRepository {


    async ifUserExist(email: string): Promise<boolean> {
        const isExist = await mentorCollection.findOne({ email })
        console.log(isExist)
        return isExist ? true : false
    }
    async newMentor(mentor: { email: string, userName: string, password?: string, photos?: string }): Promise<Imentor> {

        const Mentor: Imentor = {
            email: mentor.email,
            password: mentor.password || "",
            personal_info: {
                userName: mentor.userName,
                name: mentor.userName   ,
                bio: "",
                photo: mentor.photos || ""
            },
            wallet: 0,
            isBlocked: false,
            social_links: {
                linkedin: ""
            },
            account_info: {
                PreferredMeetingDuration: 0,
                Ratings: [],
                YearsOfExperience: 0,
                Review: []
            },
            joinedAt: undefined
        }

        const newMentor = await mentorCollection.create(Mentor)
        return newMentor
    }

    async findWithEmail(email: string): Promise<Imentor> {

        const mentor = await mentorCollection.findOne({ email })
        console.log(mentor)
        return mentor!
    }
    async pushNewDate(email: string, { date, time }: { date: Date, time: number[] }): Promise<Imentor> {
        const newAvailability = {
            date,
            time
        };
        const isExist = await mentorCollection.findOne({ email, 'account_info.Availability.date': date });
        if (isExist) {
            const data = mentorCollection.findOneAndUpdate(
                { email, "account_info.Availability.date": date },
                { $set: { "account_info.Availability.$.time": time } },
                { new: true }
            );
            return data
        } else {
            const data = await mentorCollection.findOneAndUpdate({ email }, { $push: { 'account_info.Availability': newAvailability } },)
            return data
        }
    }

    async gatAvailableTimeWithDate(_id: string, date: Date): Promise<{ date: Date, time: Number[] }> {

        const available = await mentorCollection.findById(_id)
        console.log(available, "------------------")

        const filteredData = available.account_info.Availability.filter(item => {
            console.log(item.date.getTime() === new Date(date).getTime());

            if (item.date.getTime() === new Date(date).getTime()) {

                return item

            }
        })
        console.log("++++++++  ", available.account_info.Availability)
        console.log("++++++++  ", filteredData)
        return filteredData[0]
    }
    async getAllMentors(): Promise<Imentor[]> {

        return await mentorCollection.find({}, { password: 0 })

    }

    async getAllMentorWithDate(date) {

        const data = await mentorCollection.find({}, { password: 0 })

        return data.filter(obj=>{
            return obj.account_info.Availability.filter(obj =>
                 obj.date === date)
        })
    }

    async getMentorProfile(userName:string):Promise<Imentor>{
        return await mentorCollection.findOne({"personal_info.userName":userName})
    }

    async updateUserPhoto(id:string,photoPath:string):Promise<Imentor>{

        return await mentorCollection.findByIdAndUpdate(id,{"personal_info.photo":photoPath})

    }
} 