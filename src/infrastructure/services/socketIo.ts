// import { ChatGroupUseCases } from "../server/router/injections/injection";
// import { IchatGroup } from "@entities/IchatGroup";
// import { ISocket, RedisDb } from "@interfaces/services/interface";

// import { server } from "../server/config/socketIo";
// import { Server } from "socket.io";

// export class SocketIo {
//   public io: Server;

//   constructor(redisDb: RedisDb) {
//     this.io = new Server(server, {
//       cors: {
//         origin: "*",
//       },
//     });

//     this.io.on("connection", (socket) => {
//       socket.on("userID", async (data) => {
//         console.log(data, " ");
//         if (data) {
//           const res = await ChatGroupUseCases.getAllGroupsWithUserId(data);
//           console.log("=====0d20rr00-----");
//           const groups = res.data as IchatGroup[];
//           groups.forEach((items) => {
//             socket.join(items?._id.toString());
//           });
//           socket.emit("groups", res);

//           redisDb.setData(data.userID, socket);
//         }
//       });

//       socket.on("subscription", (data) => {
//         console.log(data);
//         socket.join("room");
//       });

//       socket.on("sendData", (data) => {
//         console.log(data);
//         ChatGroupUseCases.storeMessage(data);
//         this.io.to(data.groupId).emit("receiveData", { data });
//       });

//       socket.on("disconnect", () => {
//         console.log("A client disconnected");
//       });
//     });
//   }
// }

import { Server } from "socket.io";
import { createServer } from "http";
import app from "../../infrastructure/server/config/app";
import {
  ChatGroupUseCases,
  redisDb,
} from "../server/router/injections/injection";
import { IchatGroup } from "@entities/IchatGroup";
import { IRedisDb,  } from "@interfaces/services/interface";

export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  socket.on("userID", async (data) => {
    console.log(data, "--------dsata---------------- ");
    if (data) {
      const res = await ChatGroupUseCases.getAllGroupsWithUserId(data);
      console.log("=====0d20rr00-----");
      const groups = res.data as IchatGroup[];
      groups.forEach((items) => {
        socket.join(items?._id.toString());
      });
      socket.emit("groups", res);

      const socketData = {
        id: socket.id,
        handshake: socket.handshake,
        rooms: Array.from(socket.rooms),
        connected: socket.connected,
        disconnected: socket.disconnected,
        connectTime: new Date().toISOString(),
      };

      await redisDb.setData(data.userID, socketData);
    }
  });

  socket.on("subscription", (data) => {
    console.log(data);
    socket.join("room");
  });

  socket.on("sendData", (data) => {
    console.log(data);
    ChatGroupUseCases.storeMessage(data);
    io.to(data.groupId).emit("receiveData", { data });
  });

  socket.on(
    "joinVideoCall",
    async (data: {
      peerId: string;
      id: string;
      author: "student" | "mentor";
    }) => {
      console.log(data, "obj");
      const oldObj = (await redisDb.getData(data.id)) as {
        mentor: { id: string; peerId: string };
        student: { peerId: string; id: string };
      };
      console.log(oldObj);
      if (data.author === "student") {
        if (oldObj.mentor.peerId) {
          console.log("to Mentor-------------------------------");
          socketEmitEventToUser(oldObj.mentor.id, "callUser", {
            peerId: data.peerId,
          });
          await redisDb.setData(data.id, {
            ...oldObj,
            student: { id: oldObj.student.id, peerId: data.peerId },
          });
        } else {
          console.log("studnet---------");
          socketEmitEventToUser(oldObj.mentor.id, "userWaiting", {
            peerId: data.peerId,
          });
          await redisDb.setData(data.id, {
            ...oldObj,
            student: { id: oldObj.student.id, peerId: data.peerId },
          });
        }
      } else {
        if (oldObj.student.peerId) {
          console.log("to student-------------------------------");
          socketEmitEventToUser(oldObj.student.id, "callUser", {
            peerId: data.peerId,
          });
          await redisDb.setData(data.id, {
            ...oldObj,
            mentor: { id: oldObj.mentor.id, peerId: data.peerId },
          });
        } else {
          socketEmitEventToUser(oldObj.mentor.id, "userWaiting", {
            peerId: data.peerId,
          });
          await redisDb.setData(data.id, {
            ...oldObj,
            mentor: { id: oldObj.mentor.id, peerId: data.peerId },
          });
        }
      }
      console.log(oldObj,"old");
    }
  );
  socket.on("disconnect", (data) => {
    console.log("A client disconnected", data, socket.id);
  });
});






export async function socketEmitEventToUser(
  userId: string,
  eventName: string,
  eventData: any
) {
  try {
    const socketData = await redisDb.getData(userId);
    if (socketData && socketData.id) {
      const socket = io.sockets.sockets.get(socketData.id);
      if (socket) {
        socket.emit(eventName, eventData);
        console.log(`Emitted event '${eventName}' to user ${userId}`);
      } else {
        console.error(`Socket not found for user ${userId}`);
      }
    } else {
      console.error(`Socket data not found for user ${userId}`);
    }
  } catch (error) {
    console.error(`Error emitting event to user ${userId}:`, error);
  }
}
