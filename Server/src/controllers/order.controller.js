import { Order } from "../models/order.model.js";

export const addOrder = async(req,res,next)=>{

    try {
        const { seller, buyer, product, price, status, delivery } = req.body;
        const newOrder = new Order({
            seller,
            buyer,
            product,
            price,
            status,
            delivery
        });
        await newOrder.save();
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: newOrder
        });



    } catch (error) {
        // next(error);
        res.status(500).json({
            success:false,
            message:"Error Creating Order",
            error:error.message
        })
        console.log(error.message);
    }

}

export const updateOrder = async(req,res,next)=>{
try {
    const { seller, buyer, product, price, status, delivery } = req.body;
    const updates = {status,delivery};
    const id = req.params;
    const updatedOrder = Order.findByIdAndUpdate(
        id,
        updates,
        {new:true}
    );

    res.status(200).json({
        success:true,
        message:"Successfully Updated!",
        data: updatedOrder,
    })
    
} catch (error) {
    res.status(500).json({
        success:false,
        message:"Error Deleting Order",
        error:error.message
    })
}

}