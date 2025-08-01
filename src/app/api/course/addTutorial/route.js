import { connectDB } from "@/dbConnection/ConnectDB";
import Course from "@/models/Course.model";
import Grid from "@/models/Grid.model";
import { NextRequest,NextResponse } from "next/server";

const toDay = (day) => {
    const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[day]
}
function saveTime(timeString) {
  let [hourStr, minuteStr, meridian] = timeString.toLowerCase().split(":");
  let hours = parseInt(hourStr, 10);
  let minutes = parseInt(minuteStr, 10);
  if (meridian === "pm" && hours !== 12) hours += 12;
  if (meridian === "am" && hours === 12) hours = 0;
  const istDate = new Date(2000, 0, 1, hours, minutes, 0, 0);
  return new Date(istDate.getTime()-(5.5*60*60*1000));
}


const getStart = (slot) => {
    const startTime=["8:30:AM","9:30:AM","10:30:AM","11:30:AM","12:30:PM","1:30:PM","2:30:PM","3:30:PM","4:30:PM","5:30:PM"];
    return saveTime(startTime[slot])
}

const getEnd = (slot) => {
    const endTime=["9:30:AM","10:30:AM","11:30:AM","12:30:PM","1:30:PM","2:30:PM","3:30:PM","4:30:PM","5:30:PM","6:30:PM"];
    return saveTime(endTime[slot])
}
export async function POST(req){
    try {
        await connectDB()
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Error connecting to database",
            error:error,
        },{status:500})
    }
    try {
        const {slot,room, courseId}=await req.json();
        console.log("Received data:", {slot, room, courseId});
        if(!slot || !room || !courseId){
            return NextResponse.json({
                success:false,
                message:"Provide all the necessary fields",
            },{status:400})
        }
        const course=await Course.findOne({_id:courseId})
        if(!course){
            return NextResponse.json({
                success:false,
                message:"Course not found",                
            },{status:404})
        }
        const sem=course.forSemester;
        const grid=await Grid.findOne({semester:sem});
        if(!grid){
            return NextResponse.json({
                success:false,
                message:"Grid not found for the semester",
            },{status:404})
        }
        let day,slotIndex;
        for(let i=0;i<6;i++){
            for(let j=0;j<10;j++){
                if(grid.grid[i][j].slot===slot){
                    day=i;
                    slotIndex=j;
                    break;
                }
            }
        }
        console.log(getStart(slotIndex), getEnd(slotIndex), toDay(day), room);
        const newSlot={
            start:getStart(slotIndex),
            end:getEnd(slotIndex),
            day:toDay(day),
            room:room,
        }
        course.schedule.push(newSlot);
        course.isGiven=true;
        await course.save();
        return NextResponse.json({
            success:true,
            message:"Tutorial slot added successfully",
            course:course,
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Internal server error",
            error:error,
        },{status:500})
    }
}
