import { connectDB } from "./ConnectDB.js";

async function testConnection() {
  try {
    await connectDB();
    console.log("Test: Connection to MongoDB succeeded!");
  } catch (err) {
    console.error("Test: Connection to MongoDB failed!", err);
  } finally {
    process.exit(0); // Exit after test
  }
}

testConnection();