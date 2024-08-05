"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo_1 = require("./infrastructure/services/socketIo");
const db_1 = require("./infrastructure/server/config/db");
const redis_1 = require("./infrastructure/server/config/redis");
const port = process.env.PORT || 3001;
socketIo_1.server.listen(port, () => {
    // esClientConnection()
    (0, redis_1.connectReds)();
    (0, db_1.dbConnect)()
        .then(() => {
        console.log(`Server running on port ${port}`);
    })
        .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
});
