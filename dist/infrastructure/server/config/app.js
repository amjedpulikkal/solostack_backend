"use strict";
// process.loadEnvFile()
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const studentRouter_1 = __importDefault(require("../router/studentRouter"));
const mentorRouter_1 = __importDefault(require("../router/mentorRouter"));
const chatRouter_1 = __importDefault(require("../router/chatRouter"));
const stripeRouter_1 = __importDefault(require("../router/stripeRouter"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/webhook', express_1.default.raw({ type: 'application/json' }));
app.use((0, cors_1.default)({ origin: process.env.CLIENT_SERVER, credentials: true }));
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use('/api/v1/student', studentRouter_1.default);
app.use('/api/v1/mentor', mentorRouter_1.default);
app.use('/api/v1/group-chat', chatRouter_1.default);
app.use("/", stripeRouter_1.default);
exports.default = app;
