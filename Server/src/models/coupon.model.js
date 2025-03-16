import mongoose, {Schema}  from 'mongoose'

const couponSchema = new Schema({
  code : {
    type: String,
    required: true,
  },
  product: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  buyer : [{
    type : String,
  }],
  percentage : {
    type: Number, 
  },
  minPrice : {
    type : Number
  },
  maxValue : {
    type : Number
  },
},{timestamps : true});

export const Coupon = mongoose.model('Coupon', couponSchema);
