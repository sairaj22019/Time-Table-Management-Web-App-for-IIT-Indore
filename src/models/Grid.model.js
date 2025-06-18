import { Schema,model,models } from "mongoose";
const gridSchema=new Schema({
    year:{
        type:String,
        required:true,
    },
    semester:{
        type:String,
        required:true,
    },
    grid:{
        type:[[String]],
        default:Array.from({length:10},()=>Array(10).fill(0)),
    }
},{timestamps:true,minimize:false});

const Grid=models?.Grid || model("Grid",gridSchema);
export default Grid;