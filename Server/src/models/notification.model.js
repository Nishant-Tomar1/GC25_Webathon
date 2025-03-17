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
    default:"unseen"
  }
},{timestamps : true});

export const Notification = mongoose.model('Notification', notificationSchema);
