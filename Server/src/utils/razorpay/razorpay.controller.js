import {razorpayinstance} from './razorpay.config.js'
import dotenv from "dotenv"
// const dotenv = require("dotenv");
dotenv.config({
    path : '.env'
})
import crypto from "crypto"
// const crypto = require("crypto");
// const { request } = require('http');
import {request} from "http"
const Razorpaypaymentistant = razorpayinstance();

const createOrder = async (req,res) =>{
    console.log(req.body);
    const { amount } = req.body;
    const option = {
        amount : amount*100,
        currency : "INR",
        receipt : "order_receipt"
    };
    console.log(option);
    try{
        Razorpaypaymentistant.orders.create(option,(err,order) =>{
            if(err){
                return res.status(500).json({
                    message: "Error while creating order",
                    error: err,
                    success: false
                });
            }
            return res.status(200).json({
                message: "Payment request created successfully",
                order: order,
                success: true
            });
        } )
    }
    catch(err){
        return res.status(500).json({
            message: "Error while creating payment request",
            error: err,
            sucess: false
        });
    }
}


const verifyPaymentRequest = async (req,res) => {
    const {payment_id, order_id, signature } = req.body;
    // const payment_response = await Razorpaypaymentistant.payments.fetch(razorpay_payment_id);

    const secret = process.env.key_secret;

    const hmac = crypto.createHmac('sha256', secret);

    hmac.update(order_id +'|' + payment_id);

    const expectedSignature = hmac.digest('hex');

    if(expectedSignature === signature){
        //process the payment here
        
        console.log(req.user)
        return res.status(200).json({
            message: "Payment successful",
            success: true
        });
    }
    else{
        return res.status(400).json({
            message: "Payment failed",
            success: false
        });
    }
}


export {
    createOrder,
    verifyPaymentRequest
}