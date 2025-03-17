import mongoose, {Schema}  from 'mongoose'

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title : {
    type : String
  },
  content: {
    type: String,
  },
  status : {
    type : String,
    enum : ["unseen","seen"],
  }
},{timestamps : true});

export const Review = mongoose.model('Notification', notificationSchema);
