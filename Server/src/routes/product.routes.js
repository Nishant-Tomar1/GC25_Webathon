import { Router } from "express";
import { uploadProductImages } from "../middlewares/uploadProdimage.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProduct,getProducts,addProductImage } from "../controllers/product.controller.js";
// import { addRating } from "../controllers/rating.controller.js";
// import { addReview } from "../controllers/review.controller.js";

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

router.route("/getproducts").get( getProducts )

// router.route("/getproductbyId/:id").get(getProductbyId)

// router.route("/sellproduct/:id").patch(verifyJWT, sellProduct)

// router.route('/deleteproduct/:id').delete(verifyJWT, deleteProduct)

// router.route('/addwish/:id').post(verifyJWT, addWish);

// router.route('/deletewish/:id').delete(verifyJWT, deleteWish)

// router.route('/addrating').post(verifyJWT, addRating);

// router.route('/addreview').post(verifyJWT, addReview);

export default router