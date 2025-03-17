import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as reviewcontroller from "../controllers/review.controller.js"
const router = Router()

router.route("/add-review/:productId").post(verifyJWT,reviewcontroller.addOrUpdateProductReview);

router.route("/delete-review/:productId").delete(verifyJWT,reviewcontroller.deleteProductReview);

router.route("/get-prod-review/:productId").get(reviewcontroller.getProductReview);

router.route("/user-prod-review").get(verifyJWT,reviewcontroller.getReviewByUser);

export default router