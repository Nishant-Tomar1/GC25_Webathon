import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { deleteFileFromCloudinary, uploadMultipleToCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from './../models/cart.model.js'
import { console } from "inspector";
import { log } from "console";
import mongoose from "mongoose";

const addProductImage = asyncHandler(
    async (req, res) => {
        const prodID = req.params.prodID;
        console.log(prodID);
        
        const owner = await User.findById(req.user.id).select("role fullName profilePicture ");
        if (!owner) {
            throw new ApiError(400, "Owner given is not a valid user");
        }
        if (owner.role !== "seller") {
            throw new ApiError(403, "Sorry, you are not authorized to add product images");
        }

        if (!req.files || req.files.length === 0) {
            throw new ApiError(400, "At least one product image is required");
        }

        const imageUrls = await uploadMultipleToCloudinary(req.files);

        const updatedProduct = await Product.findById(prodID);
        if (!updatedProduct) {
            throw new ApiError(404, "Product not found");
        }
        console.log(imageUrls);

        // Push new images into the product's images array
        const arr = updatedProduct.images;
        for (let i = 0; i < imageUrls.length; i++) {
            arr.push(imageUrls[i])
        }
        updatedProduct.images = arr;
        await updatedProduct.save();

        // Return the updated product
        return res.status(201).json(
            new ApiResponse(
                200,
                {
                    _id: updatedProduct._id,
                    title: updatedProduct.title,
                    category: updatedProduct.category,
                    owner: updatedProduct.seller,
                    images: updatedProduct.images,
                },
                "Product images added successfully"
            )
        );
    }
);

const addProduct = asyncHandler(
    async (req, res) => {
        const { title, description, price, category, brand, stock ,discount} = req.body;

        if (
            [title, description, price, category, brand, stock ,discount].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }

        const owner = await User.findById(req.user.id).select("role fullName profilePicture ")
        console.log(owner);

        if (!owner) {
            throw new ApiError(400, "Owner given is not a valid user");
        }
        if (owner.role !== "seller") {
            throw new ApiError(400, "Sorry you are not seller");
        }
        const product = await Product.create({
            title,
            description,
            price,
            brand,
            stock,
            category,
            discount,
            seller: owner._id,
        })

        if (!product) {
            throw new ApiError(500, "Something went wrong while product registration in database")
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    {
                        _id: product._id,
                        title: product.title,
                        category: product.category,
                        owner: product.seller
                    },
                    "Product Added Successfully"
                )
            )
    }
)

const getProducts = asyncHandler(
    async (req, res) => {
        try {
            const { category, search, page = 1, limit = 10, id } = req.query;
            
            const skip = (Number(page) - 1) * Number(limit);

            const query = {};

            if(id){
                const product = await Product.findById(id)
                return res
                .status(200)
                .json(
                new ApiResponse(200, {
                    product
                }, "Products fetched successfully")
            );
            }
            
            if (search) {
                query.$or = [
                    { title: { $regex: new RegExp(search, "i") } },
                    { description: { $regex: new RegExp(search, "i") } }
                ];
            }

            if (category) {
                query.category = String(category);
            }

            
            const products = await Product.aggregate([
                { $match: query },
                {
                    $project: {
                        updatedAt: 0,
                        seller: 0,
                        __v: 0
                    }
                },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: Number(limit) }
            ]);


            return res
            .status(200)
            .json(
                new ApiResponse(200, {
                    products
                }, "Products fetched successfully")
            );

        } catch (error) {
            console.error("Error fetching products:", error);
            throw new ApiError(500, "Something went wrong while fetching products");
        }
    }
);


const getProductsById = asyncHandler(async (req, res) => {
  try {
    const query = req.user?.id;
    const products = await Product.find({seller : query})
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          products
        },
        "Products fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new ApiError(500, "Something went wrong while fetching products");
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {

    const prodID = req.params.prodID;
    console.log(req.body);
    
    const { title, description, price, category, brand, stock } = req.body;
    // console.log(title, description, price, category, brand, stock,prodID)
    if (!title || !description || !price || !category || !brand || !stock || !discount) {
        throw new ApiError(400, "All fields are required");
    }

    console.log("dsfghj", req.user)
    const owner = await User.findById(req.user._id).select("username fullName profilePicture role");
    console.log(owner);

    if (!owner) {
        throw new ApiError(400, "Owner given is not a valid user");
    }
    if (owner.role !== "seller") {
        throw new ApiError(403, "Sorry, you are not authorized to update this product");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        prodID,
        { $set: { title, description, price, brand, stock, category } },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        throw new ApiError(500, "Something went wrong while updating the product in the database");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            _id: updatedProduct._id,
            title: updatedProduct.title,
            category: updatedProduct.category,
            seller: owner.username,
            stock: updatedProduct.stock,
            brand: updatedProduct.brand,
        }, "Product updated successfully")
    );
});

const deleteProduct = asyncHandler(    // postman check remaining   (check after implement cart)   
    async (req, res) => {
        const productId = req.params.prodID;
        
        if (!productId) {
            throw new ApiError(500, "Product id is required")
        }

        const product = await Product.findById(productId);

        if (!product) {
            throw new ApiError(400, "Product with this id doesn't exist")
        }

        if (toString(product.owner) !== toString(req.user._id)) {
            throw new ApiError(500, "User is not authorized to delete this product")
        }

        const cartListDeletion = await Cart.deleteMany({
            product: productId
        })

        if (!cartListDeletion) {
            throw new ApiError(500, "Something went wrong while deleting the product on cart")
        }

        await deleteFileFromCloudinary(product.thumbNail);

        if (product.extraImage) {
            await deleteFileFromCloudinary(product.extraImage)
        }

        await Product.findByIdAndDelete(product._id);

        res
            .status(200)
            .json(
                new ApiResponse(204, {}, "Product deleted Successfully")
            )
    }
)
export {
  addProduct,
  getProducts,
  updateProductDetails,
  deleteProduct,
  addProductImage,
  getProductsById,
};