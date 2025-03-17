import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as ratingcontroller from "../controllers/rating.controller.js"
const router = Router()

router.route("/add-rating/:productId").post(verifyJWT,ratingcontroller.addOrUpdateProductRating);

router.route("/delete-rating/:productId").delete(verifyJWT,ratingcontroller.deleteProductRating);

router.route("/get-prod-rating/:productId").get(ratingcontroller.getProductRating);

router.route("/user-prod-rating").get(verifyJWT,ratingcontroller.getRatingByUser);

export default router