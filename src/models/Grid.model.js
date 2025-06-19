import { Schema, model, models } from "mongoose";

// Define the slot-room object schema
const slotRoomSchema = new Schema({
  slot: {
    type: String,
    default: "",
  },
  room: {
    type: String,
    default: "",
  }
}, { _id: false }); 
// Prevent _id in each grid cell

// Define the main grid schema
const gridSchema = new Schema({
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  grid: {
    type: [[slotRoomSchema]],
    default: Array.from({ length: 7 }, () =>
      Array.from({ length: 10 }, () => ({ slot: "", room: "" }))
    ),
  }
}, { timestamps: true, minimize: false });

const Grid = models?.Grid || model("Grid", gridSchema);
export default Grid;
