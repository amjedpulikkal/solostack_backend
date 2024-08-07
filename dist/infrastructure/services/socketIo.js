"use strict";
// import { ChatGroupUseCases } from "../server/router/injections/injection";
// import { IchatGroup } from "@entities/IchatGroup";
// import { ISocket, RedisDb } from "@interfaces/services/interface";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
exports.socketEmitEventToUser = socketEmitEventToUser;
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
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app_1 = __importDefault(require("../../infrastructure/server/config/app"));
const injection_1 = require("../server/router/injections/injection");
exports.server = (0, http_1.createServer)(app_1.default);
const io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("userID", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data, "--------dsata---------------- ");
        if (data) {
            const res = yield injection_1.ChatGroupUseCases.getAllGroupsWithUserId(data);
            console.log("=====0d20rr00-----");
            const groups = res.data;
            groups.forEach((items) => {
                socket.join(items === null || items === void 0 ? void 0 : items._id.toString());
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
            yield injection_1.redisDb.setData(data.userID, socketData);
        }
    }));
    socket.on("subscription", (data) => {
        console.log(data);
        socket.join("room");
    });
    socket.on("sendData", (data) => {
        console.log(data);
        injection_1.ChatGroupUseCases.storeMessage(data);
        io.to(data.groupId).emit("receiveData", { data });
    });
    socket.on("joinVideoCall", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data, "obj");
        const oldObj = (yield injection_1.redisDb.getData(data.id));
        console.log(oldObj);
        if (data.author === "student") {
            if (oldObj.mentor.peerId) {
                console.log("to Mentor-------------------------------");
                socketEmitEventToUser(oldObj.mentor.id, "callUser", {
                    peerId: data.peerId,
                });
                yield injection_1.redisDb.setData(data.id, Object.assign(Object.assign({}, oldObj), { student: { id: oldObj.student.id, peerId: data.peerId } }));
            }
            else {
                console.log("studnet---------");
                socketEmitEventToUser(oldObj.mentor.id, "userWaiting", {
                    peerId: data.peerId,
                });
                yield injection_1.redisDb.setData(data.id, Object.assign(Object.assign({}, oldObj), { student: { id: oldObj.student.id, peerId: data.peerId } }));
            }
        }
        else {
            if (oldObj.student.peerId) {
                console.log("to student-------------------------------");
                socketEmitEventToUser(oldObj.student.id, "callUser", {
                    peerId: data.peerId,
                });
                yield injection_1.redisDb.setData(data.id, Object.assign(Object.assign({}, oldObj), { mentor: { id: oldObj.mentor.id, peerId: data.peerId } }));
            }
            else {
                socketEmitEventToUser(oldObj.mentor.id, "userWaiting", {
                    peerId: data.peerId,
                });
                yield injection_1.redisDb.setData(data.id, Object.assign(Object.assign({}, oldObj), { mentor: { id: oldObj.mentor.id, peerId: data.peerId } }));
            }
        }
        console.log(oldObj, "old");
    }));
    socket.on("disconnect", (data) => {
        console.log("A client disconnected", data, socket.id);
    });
}));
function socketEmitEventToUser(userId, eventName, eventData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const socketData = yield injection_1.redisDb.getData(userId);
            if (socketData && socketData.id) {
                const socket = io.sockets.sockets.get(socketData.id);
                if (socket) {
                    socket.emit(eventName, eventData);
                    console.log(`Emitted event '${eventName}' to user ${userId}`);
                }
                else {
                    console.error(`Socket not found for user ${userId}`);
                }
            }
            else {
                console.error(`Socket data not found for user ${userId}`);
            }
        }
        catch (error) {
            console.error(`Error emitting event to user ${userId}:`, error);
        }
    });
}
