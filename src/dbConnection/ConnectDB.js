import 'dotenv/config';
import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGO_URI;

if(!MONGODB_URI){
  throw new Error("Please define mongodb url in env file");
}
let cached=global.mongoose;

if(!cached){
  cached=global.mongoose={conn:null,promise:null};
}

export async function connectDB(){
  if(cached.conn){
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if(!cached.promise){
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise=mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
  }

  try{
    cached.conn = await cached.promise;
    console.log("MongoDB connected successfully");
  }catch(error){
    cached.promise=null;
    console.error("MongoDB connection failed:",error);
    throw error;
  }
  return cached.conn;
}
