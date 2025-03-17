import { User }  from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler(
    async (req , _ , next) => {
        try {
            // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") 
            // console.log(token.accessToken);
            let token;
            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
            ) {
                token = req.headers.authorization.split(" ")[1];
            }

            else token = req.cookies?.accessToken
                       
            if (!token) {
                throw new ApiError(401, "Unauthorized request")
            }
            
            //decoding acessToken
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log(decodedToken);
            
            const user = await User.findById(decodedToken.id).select("-password -refreshToken");
    
            if (!user) { 
                throw new ApiError(401,"Invalid Token");
            }
    
            req.user = user;
            next()
            
        } catch (error) {
            throw new ApiError(404,error?.message || "Invalid token")
        }
    }
)

