
import {DbObjectIdType} from "@infrastructure/@types/mongo"

export interface IReview {

    mentorId:DbObjectIdType,
    date: Date,
    time: number
    isBooked?: boolean
    requests?:{ studentId:DbObjectIdType, time: number, reviewFor: string }[]
}