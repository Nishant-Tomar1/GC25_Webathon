import { Router } from "express";
import { uploadProductImages } from "../middlewares/uploadProdimage.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {addOrderbyuser,getorderbyId ,getorderbyIdseller} from "../controllers/createorder.controller.js";

const router = Router()

router.route("/create-order").post(verifyJWT,addOrderbyuser);


router.route("/get-buyer-order").get(verifyJWT,getorderbyId);
router.route("/get-seller-order").get(verifyJWT,getorderbyIdseller);

export default router