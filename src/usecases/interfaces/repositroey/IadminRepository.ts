import { IAdmin } from "@entities/Iadmin"

export interface IAdminRepo{

        loginadmin(email:string,password:string):Promise<IAdmin>
//     getAllGroups(): Promise<IchatGroup[]>
//     createNewGroup(name:string,image:string):Promise<IchatGroup>
//     joinNewGroup(userID:string,groupID:string):Promise<IchatGroup>
//     getAllGroupsWithUserId(userID:string):Promise<IchatGroup[]>
//     getAllGroupsWithUserIdWithMassages(userID:string):Promise<IchatGroup[]>
}