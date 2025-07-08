import mongoose, { Schema, model, models } from 'mongoose';

const notificationSchema = new Schema(
  {
    message: {
      type: Schema.Types.Mixed, // Can be String or ObjectId
      required: false,
    },
    messageTitle:{
      type:String,
      required:false,
    },
    type: {
      type: String,
      enum: ['poll', 'poll update', 'timetable', 'general message','schedule selection'],
      default: 'timetable',
    },
    prof:{
      type:Schema.Types.ObjectId,
      default:null,
    },
    course:{
      type:Schema.Types.ObjectId,
      required:[true,"Course ID is required sending a notification"],
    }
  },
  { timestamps: true }
);



const Notification = models?.Notification || model('Notification', notificationSchema);
export default Notification;