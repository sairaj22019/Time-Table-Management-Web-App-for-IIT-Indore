import mongoose,{Schema,model,models} from 'mongoose'

 
const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['poll', 'poll update', 'timetable' , 'general message'],
    default: 'timetable',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  
},{timestamps:true});

const Notification=models?.Notification || model("Notification",notificationSchema);
export default Notification;