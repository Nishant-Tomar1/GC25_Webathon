import express from "express"
import { addOrder, updateOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post('/addOrder',addOrder);
router.post('/updateOrder/:id',updateOrder);

export default router;
