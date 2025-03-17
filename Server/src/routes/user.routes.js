import {Router} from 'express'
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from '../middlewares/auth.middleware.js'

import { 
    registerUser,
    generateOPTloginUser,
    verifyOTP,
    getcurUserdetails,
    getUserbyID,
    logoutUser,
    updateAccountDetails,
    updateUserProfilePicture,
    verifyToken
} 
from '../controllers/user.controller.js';

const router = Router();

router.route("/register").post(registerUser)

router.route("/generate-OPT-loginUser").post(generateOPTloginUser)

router.route("/verifyOTP").post(verifyOTP)

router.route("/verify-token").get(verifyToken);

router.route("/getuserbyId/:UserID").get(getUserbyID);


// //secured routes
router.route('/logout').post( verifyJWT, logoutUser )

router.route("/get-current-user").get( verifyJWT, getcurUserdetails )


router.route("/update-user-account-details").patch( verifyJWT, updateAccountDetails )

router.route("/update-user-profile-picture").patch( verifyJWT, upload.single('profilePicture'), updateUserProfilePicture );

export default router;