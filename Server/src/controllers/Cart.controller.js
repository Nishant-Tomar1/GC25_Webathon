import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.model.js";

const addItemToCart = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const { quantity } = req.body;
    const userId = req.user?.id;

    if (!productId || !quantity || quantity < 1) {
        throw new ApiError(400, "Invalid product ID or quantity.");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    let cartItem = await Cart.findOne({ addedBy: userId, product: productId }).select("-createdAt -updatedAt");

    if (cartItem) {
        cartItem.quantity += quantity; 
    } else {
        cartItem = new Cart({ addedBy: userId, product: productId, quantity });
    }

    await cartItem.save();

    res.status(200).json(new ApiResponse(200, cartItem, "Item added to cart successfully."));
});

const removeItemFromCart = asyncHandler(async (req, res) => {
    const  productId  = req.params.productId;
    const userId = req.user?.id;

    if (!productId) {
        throw new ApiError(400, "Product ID is required.");
    }

    const deletedItem = await Cart.findOneAndDelete({ addedBy: userId, product: productId });

    if (!deletedItem) {
        throw new ApiError(404, "Item not found in cart.");
    }

    res.status(200).json(new ApiResponse(200, {}, "Item removed from cart successfully."));
});

const updatequatityinCart = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const {quantity} = req.body;
    const userId = req.user?.id;

    if (!productId || !quantity) {
        throw new ApiError(400, "Invalid product ID or quantity.");
    }

    const cartItem = await Cart.findOne({ addedBy: userId, product: productId });

    if (!cartItem) {
        throw new ApiError(404, "Item not found in cart.");
    }

    cartItem.quantity+=quantity;
    if(cartItem.quantity<=0){
        const deletedItem = await Cart.findOneAndDelete({ addedBy: userId, product: productId });
        res.status(200).json(new ApiResponse(200, deletedItem, "Item removed from Cart"));
    }
    await cartItem.save();

    res.status(200).json(new ApiResponse(200, cartItem, "Cart updated successfully."));
});

const getCartByUserID = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(400, "User ID is required.");
    }

    const cartItems = await Cart.find({ addedBy: userId }).populate("product", "title price brand stock").select("-createdAt -updatedAt");
    if(!cartItems){
        throw new ApiError(400, "Error while fetching your cart");
    }
    if(cartItems.length ===0){
        res.status(200).json(new ApiResponse(200, {
            message:"Your cart is empty"
        }, "Cart fetched successfully."));
    }
    res.status(200).json(new ApiResponse(200, cartItems, "Cart fetched successfully."));
});



export {
    addItemToCart,
    removeItemFromCart,
    updatequatityinCart,
    getCartByUserID
};
