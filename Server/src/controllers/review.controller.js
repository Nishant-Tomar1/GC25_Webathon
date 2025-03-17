import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/review.model.js";

const addOrUpdateProductReview = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const {comment} = req.body;
    const userId = req.user?.id;

    if (!productId || !comment) {
        throw new ApiError(400, "Invalid product ID or comment.");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    const existingReview = await Review.findOne({ reviewer: userId, product: productId });

    if (existingReview) {
        existingReview.comment = comment;
        await existingReview.save();
        return res.status(200).json(new ApiResponse(200, existingReview, "cooment updated successfully."));
    }

    const newReview = await Review.create({ reviewer: userId, product: productId, comment });

    res.status(201).json(new ApiResponse(201, newReview, "comment added successfully."));
});

const deleteProductReview = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user?.id;

    if (!productId) {
        throw new ApiError(400, "Product ID is required.");
    }

    const deletedReview = await Review.findOneAndDelete({ reviewer: userId, product: productId });
    if (!deletedReview) {
        throw new ApiError(404, "Review not found.");
    }
    res.status(200).json(new ApiResponse(200, {deletedReview}, "review deleted successfully."));
});

const getProductReview = asyncHandler(async (req, res) => {
    const  productId  = req.params.productId;

    if (!productId) {
        throw new ApiError(400, "Product ID is required.");
    }

    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
        throw new ApiError(404, "Product not found.");
    }

    const reviews = await Review.find({ product: productId }).populate("reviewer", "fullName");

    res.status(200).json(
        new ApiResponse(200, reviews , "Product reviews fetched successfully.")
    );
});

const getReviewByUser = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, "User ID is required.");
    }
    console.log(userId);
    
    const userReviews = await Review.find({ reviewer: userId }).populate("product", "title brand price");
    if(!userReviews){
        throw new ApiError(400, "Error during fetching your reviews");
    }
    if(userReviews.length===0){
        res.status(200).json(new ApiResponse(200, {
            message:"No review given yet"
        }, "User reviews fetched successfully."));
    }
    res.status(200).json(new ApiResponse(200, userReviews, "User reviews fetched successfully."));
});


export {
    getReviewByUser,
    getProductReview,
    deleteProductReview,
    addOrUpdateProductReview
}