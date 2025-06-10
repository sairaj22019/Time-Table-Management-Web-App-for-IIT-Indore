import mongoose, { Schema, model, models } from 'mongoose';

const PollSchema = new Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true,
  },
  timeRanges: [{
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    votes:{
      type:Number,
      default:0,
    }
  }],
  lectureHall: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
  },
  prof: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professor",
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
  }
  
}, { timestamps: true, minimize: false });

PollSchema.pre("save", function (next) {
  for (const range of this.timeRanges) {
    if (range.start >= range.end) {
      return next(new Error("Each end time must be after start time in timeRanges"));
    }
  }
  next();
});

const Poll = models?.Poll || model("Poll", PollSchema);
export default Poll;
