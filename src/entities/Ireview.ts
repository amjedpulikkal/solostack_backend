
import {DbObjectIdType} from "@infrastructure/types/mongo"
import { Types } from "mongoose"

export interface IReview {
    _id?:DbObjectIdType,
    mentorId:DbObjectIdType,
    date: Date,
    time: number
    isBooked?: boolean
    bookedId:DbObjectIdType
    requests?:{ studentId:DbObjectIdType, time: number, reviewFor: string }[]
}


export interface IReviews {
    // private _id(_id: any, _id1: Types.ObjectId): unknown
    _id?:DbObjectIdType,
    mentorId:DbObjectIdType,
    studentId:DbObjectIdType| string,
    date: Date,
    time: number
    status?:string
}