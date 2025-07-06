import mongoose, { Schema, model, models } from 'mongoose';

const PollSchema = new Schema({
  options: [{
    date:{
      type:Date,
      required:true,
    },
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
  }],
  votes:{
    type:[Object],
    default:[],
  },
  reason:{
    type:String,
    required:[true,"Reason for the poll is required"],
  },
  context:{
    type:String,
    required:[true,"Context of the poll is required"],
  },
  isApproved:{
    type:Boolean,
    default:false,
  },
  expiryDate:{
    type:Date,
    required:[true,"Expiry date for the poll is required"],
  }
  
}, { timestamps: true, minimize: false });

// PollSchema.pre("save", function (next) {
//   for (const range of this.timeRanges) {
//     if (range.start >= range.end) {
//       return next(new Error("Each end time must be after start time in timeRanges"));
//     }
//   }
//   next();
// });

const Poll = models?.Poll || model("Poll", PollSchema);
export default Poll;
