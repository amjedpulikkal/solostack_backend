"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const injection_1 = require("./injections/injection");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/api/v1/stripe/create-payment-intent", auth_1.isAuthenticated, (req, res, next) => { injection_1.stripeController.createPaymentIntent(req, res, next); });
router.post("/api/v1/stripe/isSucceeded", auth_1.isAuthenticated, (req, res, next) => { injection_1.stripeController.isSucceeded(req, res, next); });
router.post("/webhook", (req, res, next) => {
    injection_1.stripeController.webHock(req, res, next);
});
router.get("/test", (req, res) => res.send("ok"));
router.get("/api/v1/ice-servers", (req, res, next) => injection_1.stripeController.turn_and_stun_server(req, res, next));
exports.default = router;
