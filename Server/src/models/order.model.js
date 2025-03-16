import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
	seller : {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
    buyer:{
        type: Schema.Types.ObjectId,
		ref: 'User',
    },
    product:{
		type: Schema.Types.ObjectId,
		ref: 'Product',
	},
    price:{
        type: Number,
    },
	status: {
		type: String,
		enum: ['Ordered', 'Packed', 'Out for Delivery', 'Delivered', 'Cancelled'],
		default: 'Ordered',
	},
    delivery:{
        type: Date,
    }
},{timestamps : true});

export const Order =  mongoose.model('Order', orderSchema);
