import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { deleteFileFromCloudinary, uploadMultipleToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from './../models/order.model.js'
import mongoose  from 'mongoose'

const addOrderProduct = async (cartArray, userId) => {
    try {
        if (!Array.isArray(cartArray) || cartArray.length === 0) {
            throw new ApiError(400, "Cart can't be empty.");
        }

        const orders = cartArray.map(item => {
            if (!item.product || !mongoose.Types.ObjectId.isValid(item.product._id)) {
                console.error(`Invalid Product ID: ${item.product?._id}`);
                throw new ApiError(400, `Invalid product ID: ${item.product?._id}`);
            }

            return {
                seller: item.product.seller,
                buyer: userId,
                product: item.product._id,
                price: item.product.price - (item.product.price * item.product.discount * 0.01),
                status: "Ordered"
            };
        });

        await Order.insertMany(orders);
        return true;
    } catch (error) {
        console.error("Error while creating order:", error);
        return false;
    }
};

const addOrderbyuser = asyncHandler( async (req, res) => {
    try {
        
        const cartArray = req.body.cartarray;
        const userId = req.user?.id;

        const success = await addOrderProduct(cartArray, userId);
        console.log("sdfghfdsa");
        if (!success) {
            throw new ApiError(500, "Failed to place order.");
        }
        res.status(201).json(new ApiResponse(201, {}, "Order Placed Successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});

const getorderbyId = asyncHandler(
    async(req,res)=>{
        const userorder = await Order.find({buyer:req.user?.id})
        .populate("product", "title price brand stock description images discount")
        .select("-createdAt -updatedAt");
        if(!userorder){
            throw new ApiError(400, "error during find your order");
        }
        res.status(201).json(new ApiResponse(201, {userorder}, "Order fetched"));
    }
)


const getorderbyIdseller = asyncHandler(
    async(req,res)=>{
        const userorder = await Order.find({seller:req.user?.id})
        .populate("product", "title price brand stock description images discount")
        .select("-createdAt -updatedAt");
        if(!userorder){
            throw new ApiError(400, "error during find your order");
        }
        res.status(201).json(new ApiResponse(201, {userorder}, "Order fetched"));
    }
)
// export const addOrder = async (req, res, next) => {

//     try {
//         const { seller, buyer, product, price, status, delivery } = req.body;
//         const newOrder = new Order({
//             seller,
//             buyer,
//             product,
//             price,
//             status,
//             delivery
//         });
//         await newOrder.save();
//         res.status(201).json({
//             success: true,
//             message: 'Order created successfully',
//             data: newOrder
//         });



//     } catch (error) {
//         // next(error);
//         res.status(500).json({
//             success: false,
//             message: "Error Creating Order",
//             error: error.message
//         })
//         console.log(error.message);
//     }

// }

// export const updateOrder = async (req, res, next) => {
//     try {
//         const { seller, buyer, product, price, status, delivery } = req.body;
//         const updates = { status, delivery };
//         const id = req.params;
//         const updatedOrder = Order.findByIdAndUpdate(
//             id,
//             updates,
//             { new: true }
//         );

//         res.status(200).json({
//             success: true,
//             message: "Successfully Updated!",
//             data: updatedOrder,
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Error Deleting Order",
//             error: error.message
//         })
//     }

// }

export {
    
    addOrderbyuser,
    getorderbyId,
    getorderbyIdseller
}