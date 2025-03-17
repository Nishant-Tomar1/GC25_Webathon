const express = require("express");
const { createOrder, verifyPaymentRequest } = require("./../utils/razorpay/razorpay.controller");
const router = express.Router();

router.post('/create-order',createOrder)

router.post('/verify-payment',verifyPaymentRequest)

module.exports = router;