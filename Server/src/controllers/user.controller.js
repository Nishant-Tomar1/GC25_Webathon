import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from '../models/user.model.js'
import { sendmail } from './../utils/mails/verifymail.js'
import { LoginOTP } from './../models/loginotp.js'
import jwt from "jsonwebtoken"
import { uploadOnCloudinary, deleteFileFromCloudinary } from "../utils/cloudinary.js"
const generateTokens = async (userId) => {
    try {

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const Token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY,
        });

        user.Token = Token;
        await user.save({ validateBeforeSave: false });

        console.log("Generated Token:", Token);
        return { Token };
    } catch (error) {
        console.error("Error generating token:", error);
        throw new ApiError(500, "Something went wrong while generating token");
    }
};



const registerUser = asyncHandler(
    async (req, res) => {
    
        const { fullName, email, role, contactNumber, address } = req.body
        if (
            [fullName, email, role, contactNumber, address].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "All fields are required")
        }
        const ExistedUser = await User.findOne({
            $or: [{ email }]
        })
        if (ExistedUser) {
            throw new ApiError(409, "User with this email or username already exists")
        }
        const user = await User.create({
            fullName,
            email: email.toLowerCase(),
            contactNumber,
            role,
        address
        })
        const createdUser = await User.findById(user._id).select(
            "-Token"
        )
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong during user registration")
        }
        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")
        )
    }
)

const generateOPTloginUser = asyncHandler(
    async (req, res) => {
        const { email } = req.body;

        if (!email) {
            throw new ApiError(400, "Email is required");
        }
        
        const user = await User.findOne({ email });
        
        const OTP = Math.floor(100000 + Math.random() * 900000);
        console.log("Generated OTP:", OTP);
        
        const existingOTP = await LoginOTP.findOne({ email });

        if (existingOTP) {
            await LoginOTP.findByIdAndDelete(existingOTP._id);
        }
        
        const otplogin = await LoginOTP.create({ email, OTP });
        
        await sendmail({ email, otp: OTP });
        
        const createdOTP = await LoginOTP.findById(otplogin._id);
        if (!createdOTP) {
            throw new ApiError(500, "Something went wrong during login");
        }
        
        return res.status(201).json(
            new ApiResponse(200, {
                message: "OTP sent successfully"
            }, "OTP sent successfully")
        );
    }
);

const logoutUser = asyncHandler(
    async (req, res) => {

        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    Token: 1
                }
            },
            {
                new: true
            }
        )
        // console.log(user);

        const options = {
            // httpOnly : true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("Token", options)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "User logged Out Successfully"
                )
            )

    }
)

const verifyOTP = asyncHandler(
    async (req, res) => {
        const { email, otp } = req.body;

        if (!email || !otp) {
            throw new ApiError(400, "Email and OTP both are required");
        }
        
        const otpRecord = await LoginOTP.findOne({ email, OTP: otp });
        
        if (!otpRecord) {
            throw new ApiError(400, "Wrong OTP");
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(200).json(new ApiResponse(400, {email}, "User does not exist in database"))
        }

        const {Token} = await generateTokens(user._id);
        // Optional: Clean up the OTP record after successful verification
        // await LoginOTP.findByIdAndDelete(otpRecord._id);
        console.log(Token);
        return res.status(200).json(
            new ApiResponse(200, {user,Token}
                , "Login successful")
        );
    }
);

const getAllUserEmails = asyncHandler(
    async (req, res) => {
        const prevUsers = await User.aggregate([
            {
                $match: {}
            },
            {
                $project: {
                    email: 1,
                }
            }
        ])

        if (!prevUsers) {
            throw new ApiError(500, "Could not fetch Previous Users data!")
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, prevUsers, "Fetched Successfully")
            )
    }
)
const getcurUserdetails = asyncHandler(
    async (req, res) => {
        const curUser = await User.findById(req.user._id).select(
            "-Token"
        );
        if (!curUser) {
            throw new ApiError(500, "Could not fetch Users data!")
        }
        return res
            .status(200)
            .json(
                new ApiResponse(200, curUser, "Fetched Successfully")
            )
    }
)
const getUserbyID = asyncHandler(
    async(req,res)=>{
        const curUser = await User.findById(req.params.UserID).select(
            "-Token"
        );
        if(!curUser){
            throw new ApiError(500, "Could not fetch Users data!")
        }
        return res
            .status(200)
            .json(
                new ApiResponse(200, curUser, "Fetched Successfully")
            )
    }
)

const updateAccountDetails = asyncHandler(
    async (req, res) => {
        const { fullName, email, contactNumber,address } = req.body;

        if (!fullName || !email || !contactNumber) {
            throw new ApiError(401, "All fields are required (fullname and email)")
        }

        const ExistedUser = await User.findOne({
            email: email
        })

        if (ExistedUser && (String(ExistedUser._id) !== String(req.user._id))) {
            if (ExistedUser.email === email) throw new ApiResponse(409, {}, "User with this email already exists");
        }

        await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: {
                    fullName,
                    email: email,
                    contactNumber,
                    address,
                }
            },
            {
                new: true
            }
        )

        const updatedUser = await User.findById(req.user._id).select("-password -createdAt -updatedAt")

        // console.log(updatedUser);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedUser,
                    "Account details updated Succesfully"
                ))
    }
)

const updateUserProfilePicture = asyncHandler(
    async (req, res) => {
        const profilePictureLocalPath = req.file?.path;
        console.log(profilePictureLocalPath);
        if (!profilePictureLocalPath) {
            throw new ApiError(400, "Profile Picture file is missing")
        }

        const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
        console.log("xdsfg", profilePicture)
        if (!profilePicture.url) {
            throw new ApiError(400, "Error while uploading profilePicture")
        }

        await User.findByIdAndUpdate(
            req?.user._id,
            {
                $set: {
                    profilePicture: profilePicture.url
                }
            },
            { new: true }
        )

        if (req.user.profilePicture) {
            await deleteFileFromCloudinary(req.user.profilePicture); 
        }

        const user = await User.findById(req.user._id).select("-password")

        return res
            .status(200)
            .json(new ApiResponse(
                200,
                user,
                "User ProfilePicture Updated Successfully"
            ))
    }
)
const verifyToken = asyncHandler(
    async (req, res) => {
        try {
            let incomingRefreshToken;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                incomingRefreshToken = req.headers.authorization.split(" ")[1];
            }
            else incomingRefreshToken = req.cookies?.Token

            if (!incomingRefreshToken) {
                throw new ApiError(401, "Unauthorized Request")
            }
            const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.TOKEN_SECRET);
            console.log(decodedRefreshToken);

            const user = await User.findById(decodedRefreshToken.id)

            console.log(user.Token);

            if (!user) {
                throw new ApiError(401, "Invalid Token");
            }
            console.log("sdfv")
            const {Token : newToken} = await generateTokens(user._id);
            const loggeduser = await User.findById(decodedRefreshToken.id)
            const options = {
                // httpOnly : true,
                secure: true
            }
            // console.log(newUser, newAccessToken, newRefreshToken);
            return res
                .status(200)
                .cookie("Token", newToken, options)
                .json(
                    new ApiResponse(
                        200, {
                        Token: newToken,
                        user: loggeduser
                    },
                        "Token Refreshed"
                    )
                )
        } catch (error) {
            throw new ApiError(401, "Invalid token ")
        }
    }
)
export {
    registerUser,
    generateOPTloginUser,
    verifyOTP,
    getAllUserEmails,
    getcurUserdetails,
    getUserbyID,
    logoutUser,
    updateAccountDetails,
    updateUserProfilePicture,
    verifyToken
}