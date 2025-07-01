import mongoose, { Schema, model, models } from 'mongoose';

const notificationSchema = new Schema(
  {
    message: {
      type: Schema.Types.Mixed, // Can be String or ObjectId
      required: false,
    },
    type: {
      type: String,
      enum: ['poll', 'poll update', 'timetable', 'general message'],
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

// Optional: Add custom validation logic
notificationSchema.pre('save', function (next) {
  if (this.type === 'poll' && !mongoose.Types.ObjectId.isValid(this.message)) {
    return next(new Error('Invalid ObjectId for poll notification'));
  }
  if (this.type !== 'poll' && typeof this.message !== 'string') {
    return next(new Error('Message must be a string for non-poll notifications'));
  }
  next();
});

const Notification = models?.Notification || model('Notification', notificationSchema);
export default Notification;
