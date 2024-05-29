import { IchatGroup } from "@entities/IchatGroup"

export interface IchatGroupRepository{


    getAllGroups(): Promise<IchatGroup[]>
    createNewGroup(name:string,image:string):Promise<IchatGroup>
    joinNewGroup(userID:string,groupID:string):Promise<IchatGroup>
    getAllGroupsWithUserId(userID:string):Promise<IchatGroup[]>
    getAllGroupsWithUserIdWithMassages(userID:string):Promise<IchatGroup[]>
}