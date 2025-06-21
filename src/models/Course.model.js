import mongoose, { Schema, models, model } from "mongoose";
const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  courseCode:{
    type:String,
    required:true,
  },
  slots:{
    type:[String],
  },
  schedule: [
    {
      start: {
        type: Date,
        // required: [true, "Start time is required"],
      },
      end: {
        type: Date,
        // required: [true, "End time is required"],
      },
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        // required: [true,"Day of the classes is required"],
      },
      room:{
        type:String,
        // required:[true,"Room of the class is required"],
      }
    },
  ],
  forSemester:{
    type:String,
    required:true,
  },
  prof:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Professor",
  }],
  profName:[{//this stands for course instructors
    type:String,
  }],
  courseCoordinator:{
    type:String,
  },
  profEmail:[{
    type:String,
  }],
  credits:{
    type:Number,
    required:[true,"Credits of the course is required"],
  },
  enrolledStudents:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Student",
    required:[true,"Student list is required"]
  }]
},{timestamps:true,minimize:false});



const Course = models?.Course || model("Course", courseSchema);
export default Course;