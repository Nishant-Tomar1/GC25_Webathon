import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as couponcontroller from "../controllers/coupon.controller.js"
const router = Router()

router.route("/cheack-valid-coupon").post(verifyJWT,couponcontroller.checkCouponValid);

router.route("/create-coupon").post(verifyJWT,couponcontroller.createCoupon);

router.route("/delete-coupon/:couponId").delete(verifyJWT,couponcontroller.deleteCoupon);


export default router