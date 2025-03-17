import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Rating } from "../models/rating.model.js";

const addOrUpdateProductRating = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const { value } = req.body;
    const userId = req.user?.id;

    if (!productId || value < 1 || value > 5) {
        throw new ApiError(400, "Invalid product ID or rating value (must be 1-5).");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found.");
    }

    const existingRating = await Rating.findOne({ evaluator: userId, product: productId });

    if (existingRating) {
        existingRating.value = value;
        await existingRating.save();
        return res.status(200).json(new ApiResponse(200, existingRating, "Rating updated successfully."));
    }

    const newRating = await Rating.create({ evaluator: userId, product: productId, value });

    res.status(201).json(new ApiResponse(201, newRating, "Rating added successfully."));
});

const deleteProductRating = asyncHandler(async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user?.id;

    if (!productId) {
        throw new ApiError(400, "Product ID is required.");
    }

    const deletedRating = await Rating.findOneAndDelete({ evaluator: userId, product: productId });
    if (!deletedRating) {
        throw new ApiError(404, "Rating not found.");
    }

    res.status(200).json(new ApiResponse(200, {}, "Rating deleted successfully."));
});

const getProductRating = asyncHandler(async (req, res) => {
    const productId = req.params.productId;

    if (!productId) {
        throw new ApiError(400, "Product ID is required.");
    }

    const productExists = await Product.exists({ _id: productId });
    if (!productExists) {
        throw new ApiError(404, "Product not found.");
    }

    const ratings = await Rating.find({ product: productId }).populate("evaluator", " fullName");

    const averageRating =
        ratings.length > 0 ? ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length : 0;

    res.status(200).json(
        new ApiResponse(200, { ratings, averageRating: averageRating.toFixed(1) }, "Product ratings fetched successfully.")
    );
});

const getRatingByUser = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        throw new ApiError(400, "User ID is required.");
    }

    const userRatings = await Rating.find({ evaluator: userId }).populate("product", "title brand price");
    if (!userRatings) {
        throw new ApiError(400, "Error during fetching your ratings");
    }
    if (userRatings.length === 0) {
        res.status(200).json(new ApiResponse(200, {
            message: "No rating given yet"
        }, "User ratings fetched successfully."));
    }
    res.status(200).json(new ApiResponse(200, userRatings, "User ratings fetched successfully."));
});

export {
    addOrUpdateProductRating,
    deleteProductRating,
    getProductRating,
    getRatingByUser
}



