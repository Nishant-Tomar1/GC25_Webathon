import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import * as Cartcontroller from "../controllers/Cart.controller.js"
const router = Router()

router.route("/add-item-to-cart/:productId").post(verifyJWT,Cartcontroller.addItemToCart);

router.route("/update-cart/:productId").patch(verifyJWT,Cartcontroller.updatequatityinCart);

router.route("/remove-item/:productId").delete(verifyJWT,Cartcontroller.removeItemFromCart);

router.route("/get-user-cart").get(verifyJWT,Cartcontroller.getCartByUserID);

export default router