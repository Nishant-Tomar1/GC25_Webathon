import { Router } from "express";
import { uploadProductImages } from "../middlewares/uploadProdimage.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {addorder} from "../controllers/createorder.controller.js";

const router = Router()

router.route("/create-order").post(verifyJWT,addorder);
// router.route('/addproductimages/:prodID').patch(
//     verifyJWT,
//     uploadProductImages,
//     addProductImage
// )

// router.route("/getproducts").get(getProducts)

// router.route("/updateproductdetails/:prodID").patch(verifyJWT,updateProductDetails)


export default router