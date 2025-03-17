import razorpay from 'razorpay'
import dotenv from 'dotenv'

dotenv.config({
    path : '.env'
})

exports.razorpayinstance = () => {
    return new razorpay({
        key_id: process.env.razorpay_key_id,
        key_secret: process.env.razorpay_key_secret,
    });
} 