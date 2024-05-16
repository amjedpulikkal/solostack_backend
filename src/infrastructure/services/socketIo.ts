import { Server } from 'socket.io';
import { createServer } from 'http';
import app from '../../infrastructure/server/config/app';



const user = new Map()

export const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_SERVER
    }
})


io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on("userID", (data) => {
        console.log(data)
        user.set(data, socket)
    })
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});


