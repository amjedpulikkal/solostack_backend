
import {DbObjectIdType} from "@infrastructure/@types/mongo"

export interface IReview {
    _id?:string,
    mentorId:DbObjectIdType,
    date: Date,
    time: number
    isBooked?: boolean
    bookedId:DbObjectIdType
    requests?:{ studentId:DbObjectIdType, time: number, reviewFor: string }[]
}


export interface IReviews {

    mentorId:DbObjectIdType,
    studentId:DbObjectIdType| string,
    date: Date,
    time: number
    status:string
}