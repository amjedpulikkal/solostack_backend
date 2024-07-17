

// import { Server } from 'socket.io';
// import { createServer } from 'http';
// import app from './app';

// export const server = createServer(app);
// const io = new Server(server, {
//     cors: {
//       origin: "*",
//     },
//   });

//   io.on("connection", (socket) => {
//     socket.on("userID", async (data) => {
//       console.log(data, " ");
//       if (data) {
//         const res = await ChatGroupUseCases.getAllGroupsWithUserId(data);
//         console.log("=====0d20rr00-----");
//         const groups = res.data as IchatGroup[];
//         groups.forEach((items) => {
//           socket.join(items?._id.toString());
//         });
//         socket.emit("groups", res);

//         redisDb.setData(data.userID, socket);
//       }
//     });

//     socket.on("subscription", (data) => {
//       console.log(data);
//       socket.join("room");
//     });

//     socket.on("sendData", (data) => {
//       console.log(data);
//       ChatGroupUseCases.storeMessage(data);
//       io.to(data.groupId).emit("receiveData", { data });
//     });

//     socket.on("disconnect", () => {
//       console.log("A client disconnected");
//     });
//   });