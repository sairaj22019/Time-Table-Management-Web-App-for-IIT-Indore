import { Schema,model,models } from "mongoose";

const slotSchema=new Schema({
    day:{
        type:String,
        enum:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        required:[true,"Day of the booked slot is required"]
    },
    date:{
        type:Date,
        required:[true,"Date of the booked slot is required"]
    },
    start:{
        type:Date,
        required:[true,"Start time of the booked slot is required"]
    },
    end:{
        type:Date,
        required:[true,"End time of the booked slot is required"]
    },
    room:{
        type:String,
        required:[true,"Room is required"]
    },

},{timestamps:true,minimize:false})

const Slot=models?.Slot||model("Slot",slotSchema);
export default Slot