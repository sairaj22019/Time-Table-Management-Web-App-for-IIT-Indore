import mongoose ,{Schema,model,models} from 'mongoose';

//So here i was thinking something like this the admin clicks a button on the frontend and he is redirected to a page where he can create courses and insert their slots in the timetable.
const scheduleSchema=new Schema({
    slots:[{
        time:{
            start:{
                type:Date,
                required:true,
            },
            end:{
                type:Date,
                required:true,
            },
            day:{
                type:String,
                enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                required:true,
            },
        },
        room:{
            type:String,
            required:[true,"Room of the class is required"],
        },
        course:{
            //So when ever we want to fetch timetable for a student we go through the data base and then go into the course id and check if his id exists there or not(This will be slower as multiple data searches may be required)
            //orrr 
            //We can use something like checking for the registered courses of the student and then get their slots and everything from that schema and return that to the frontend to display without ever constructing a database model for the Schedule.
            //Orr 
            //We can have this and that so that the admin can view schedules using this and the user can check his shit with that.
            type:mongoose.Schema.Types.ObjectId,
            required:[true,"Course name is required"],
        }

    }]
})

const Schedule=models?.Schedule||model("Schedule",scheduleSchema);
export default Schedule