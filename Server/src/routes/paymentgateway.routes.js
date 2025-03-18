import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as paymentcontroller from './../utils/razorpay/razorpay.controller.js'

const router = Router()

router.route("/create-order").post(verifyJWT,paymentcontroller.createOrder);

router.route("/verify-payment").post(verifyJWT,paymentcontroller.verifyPaymentRequest);

export default router