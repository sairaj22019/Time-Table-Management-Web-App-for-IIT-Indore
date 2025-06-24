import mongoose, { Schema, models, model } from "mongoose";
//SO the working of this would include some sort of method like get access of the data from the admin page of the frontend and then have a read operation on the prof data base and then go ahead and create a course Schema for the course and store the _id of the prof in  the schema

//Butttt he question is what if there is a prof who did not register in our interface so we need to have a alternative as well so we will remove the required field in the id here and just ask for the prof name and email id in the form the admin is filling.
//Also check in the courses data base if there are any collisions in the system here i.e any sort of place collisions.
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
  lectures:{
    type:Number,
  },
  room:{
    type:String,
    default:"empty",
  },
  tutorials:{
    type:Number,
  },
  practicals:{
    type:Number,
  },
  studentYear:{
    type:Number,
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
