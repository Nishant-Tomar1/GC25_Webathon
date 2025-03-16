import mongoose, { Schema }  from 'mongoose'

const cartSchema = new Schema({
  addedBy : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required : true
  },
},{timestamps : true});

export const Cart = mongoose.model('Cart', cartSchema);
