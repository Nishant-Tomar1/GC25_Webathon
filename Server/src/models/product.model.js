import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
	title: {
		type: String,
		required: [true, "product name is required"],
		trim: true,
	},
	description: {
		type: String,
		required: [true, "product description is required"],
	},
    brand : {
        type : String
    },
	price: {
		type: Number,
		required: [true, "Product price is required"],
	},
	category: {
		type: String,
		enum: ['Electronics and Appliances', 'Home and Furniture','Fashion and Beauty','Sports and Hobbies','Stationary','Groceries','Pharmacy'],
		required: [true,"Product categaory is required"],
	},
	images : [{
		type : String,
	}],
	seller : {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, "Owner is not provided"],
	},
	stock: {
		type: Number,
	},
    discount : {
        type : Number,
        default : 0,
    },
	ratings: [
        {
            type : Schema.Types.ObjectId,
			ref : "Rating"
        },
    ],
    reviews: [
        {
            type : Schema.Types.ObjectId, 
			ref : "Review"
        },
    ],
},{timestamps : true});

export const Product =  mongoose.model('Product', productSchema);
