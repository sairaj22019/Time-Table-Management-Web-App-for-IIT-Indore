import mongoose, { Schema, model, models } from "mongoose";
import Notification from "./Notification.model";

const StudentSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User Id is required"],
    },
    enrolledClasses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Courses",
        }
    ],
    year:{
        type:Number,
        enum:[1,2,3,4,5,6],
        required:[true,"Student Year is required"],
    },
    department:{
        type:String,
        required:[true,"Student department is required"],
    },
    rollno:{
        type:String,
        required:[true,"Roll number is required"],
        unique:true,
    },
    notifications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification",
    }]
},{timestamps:true,minimize:false});

const Student=models?.Student || model('Student',StudentSchema);
export default Student;