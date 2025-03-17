import mongoose, {Schema} from 'mongoose'
import jwt from "jsonwebtoken";  

const LoginOTPSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    OTP: {
        type: Number
    }
},{
timestamps:true,
expireAfterSeconds:3600
});

export const LoginOTP = mongoose.model('LoginOtp', LoginOTPSchema);
