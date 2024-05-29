import { Server } from 'socket.io';
import { createServer } from 'http';
import app from '../../infrastructure/server/config/app';
import {ChatGroupUseCases} from "../server/router/injections/injection"
import { IchatGroup } from '@entities/IchatGroup';


const user = new Map()

export const server = createServer(app);
const io = new Server(server, {
    cors: {
        // origin: process.env.CLIENT_SERVER
        origin:"*"
    }
})



io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on("userID", async (data) => {
        console.log(data)
        if(data){
            const res = await ChatGroupUseCases.getAllGroupsWithUserId(data) 
            console.log(res,"=====0d20rr00-----")
             const groups = res.data as IchatGroup[]
             groups.map(items=>{
                console.log(items?._id.toString(),"eeeeeeeeeeeeeeeeeeeeee")
                socket.join(items?._id.toString())
             })
            socket.emit("groups",res)
             user.set(data, socket)
        }
    })

    socket.on("subscription",(data=>{
        console.log(data)
        socket.join("room")
    }))
    socket.on("sendData",(data)=>{
        console.log(data)
        
        ChatGroupUseCases.storeMessage(data)
        io.to(data.groupId).emit("receiveData",{data});
    })
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});


