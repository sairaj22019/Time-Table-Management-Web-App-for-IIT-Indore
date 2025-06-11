import mongoose,{Schema,model,models} from "mongoose";

const ProfessorSchema=new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User ID is required"],
    },
    teachingClasses:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
    ],
    department:{
        type:String,
        required:[true,"Department is required"],
    },
    activePolls:[{
        type:mongoose.Schema.Types.ObjectId,  
        ref:"Polls",
    }],
    notifications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification",
    }]
},{timestamps:true,minimize:false})

const Professor=models?.Professor || model('Professor',ProfessorSchema);
export default Professor;