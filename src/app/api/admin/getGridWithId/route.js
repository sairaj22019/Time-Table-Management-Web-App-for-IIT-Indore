

// import { connectDB } from "@/dbConnection/ConnectDB";
// import { NextResponse, NextRequest } from "next/server";
// import Grid from "@/models/Grid.model";
// export async function GET(req) {
//   try {
//     await connectDB();
//   } catch (error) {
//     return NextResponse.json(
//       { success:false,
//         message: "Database connection failed",
//         error: error},
//       { status: 500 }
//     );
//   }
//   try {
//     const { searchParams } = new URL(req.url);
//     const gridId = searchParams.get("gridId");

//     if (!gridId) {
//       return NextResponse.json(
//         { success: false, message: "Grid ID is required" },
//         { status: 400 }
//       );
//     }

//     const grid = await Grid.findById(gridId)

//     if (!grid) {
//       return NextResponse.json(
//         { success: false, message: "Grid not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, grid }, { status: 200 });
//   } catch (error) {
    
//   }
// }



import { connectDB } from "@/dbConnection/ConnectDB";
import { NextResponse, NextRequest } from "next/server";
import Grid from "@/models/Grid.model";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      { success:false,
        message: "Database connection failed",
        error: error},
      { status: 500 }
    );
  }
  try {
    const { gridId } = await req.json();
    console.log("gridId", gridId);
    if (!gridId) {
      return NextResponse.json(
        { success: false, message: "Grid ID is required" },
        { status: 400 }
      );
    }

    const grid = await Grid.findById(gridId);

    if (!grid) {
      return NextResponse.json(
        { success: false, message: "Grid not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, grid }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
        sucesss: false,
        message: "An error occurred while fetching the grid",
        error:  "Internal Server Error",
    },{status: 500});
  }
}