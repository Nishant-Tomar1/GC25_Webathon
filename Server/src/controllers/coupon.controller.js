import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Coupon } from "../models/coupon.model.js";
import { Notification } from "./../models/notification.model.js"
import mongoose from 'mongoose'

const sendNotification = async (userIds, title, content, status = "unseen") => {
    try {
        if (!Array.isArray(userIds) || userIds.length === 0) {
            throw new ApiError(400, "No users provided for notification.");
        }

        const objectIds = userIds.map(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.error(`Invalid ObjectId: ${id}`);
                throw new ApiError(400, `Invalid user ID: ${id}`);
            }
            return new mongoose.Types.ObjectId(id);
        });

        const notifications = objectIds.map(userId => ({
            user: userId,
            title,
            content,
            status
        }));

        await Notification.insertMany(notifications);

        return true;
    } catch (error) {
        console.error("Error sending notification:", error);
        return false;
    }
};

const createCoupon = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const { code,buyer, product, percentage, minPrice, maxValue } = req.body;

    if(buyer.length===0){
        throw new ApiError(400, "select atleast one buyer");
    }
    if(product.length===0){
        throw new ApiError(400, "select atleast one buyer");
    }
    if (!code  || !percentage || !minPrice || !maxValue) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(400,"Error while fetching user")
    }
    if(user.role!=="seller"){
        throw new ApiError(400,"Your are not authorize")
    }
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
        throw new ApiError(400, "Coupon code already exists.");
    }
    const newCoupon = await Coupon.create({
        code: code.toUpperCase(), 
        product,
        buyer,
        percentage,
        minPrice,
        maxValue,
    });
    if(!newCoupon){
        throw new ApiError(400, "Coupon code already exists.");
    }
    const success = sendNotification(buyer,"New coupon","You received a new coupon","unseen");

    res.status(201).json(new ApiResponse(201, newCoupon, "Coupon created successfully."));
});

const checkCouponValid = asyncHandler(async (req, res) => {
    console.log(req.body)
    const userId = req.user?.id;
    const { code } = req.body;

    if (!code || !userId ) {
        throw new ApiError(400, "Coupon code, user ID, and cart total are required.");
    }
    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(400,"Error while fetching user")
    }
    if(user.role!=="seller"){
        throw new ApiError(400,"Your are not authorize")
    }
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (coupon) {
        throw new ApiError(404, "Copon already exist");
    }
    res.status(200).json(
        new ApiResponse(200, { 
            msg:true
        }, "Coupon is valid.")
    );
});

const deleteCoupon = asyncHandler(async (req, res) => {
    const  couponId = req.params.couponId;

    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
        throw new ApiError(404, "Coupon not found.");
    }

    res.status(200).json(new ApiResponse(200, {}, "Coupon deleted successfully."));
});

const getcouponsforuser = asyncHandler(
    async() =>{
        const userId = req.user?.id;

    }
)

export {
    createCoupon,
    checkCouponValid,
    deleteCoupon
};
