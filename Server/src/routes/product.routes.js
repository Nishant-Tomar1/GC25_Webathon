import { Router } from "express";
import { uploadProductImages } from "../middlewares/uploadProdimage.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProduct,getProducts,addProductImage,updateProductDetails } from "../controllers/product.controller.js";

const router = Router()

router.route('/addproduct').post(
    verifyJWT,
    uploadProductImages,
    addProduct
)
router.route('/addproductimages/:prodID').patch(
    verifyJWT,
    uploadProductImages,
    addProductImage
)

router.route("/getproducts").get(getProducts)

router.route("/updateproductdetails/:prodID").patch(verifyJWT,updateProductDetails)


export default router