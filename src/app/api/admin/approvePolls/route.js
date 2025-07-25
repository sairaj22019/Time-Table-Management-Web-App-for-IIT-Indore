
import { connectDB } from "@/dbConnection/ConnectDB";
import Notification from "@/models/Notification.model";
import Poll from "@/models/Polls.model";
import Professor from "@/models/Professor.model";
import Slot from "@/models/slot.model";
import { NextResponse } from "next/server";
import Course from "@/models/Course.model";
import Student from "@/models/Student.model";
export async function GET(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error connecting to database",
        error,
      },
      { status: 500 }
    );
  }

  try {
    const expiredUnapprovedPolls = await Poll.find({
      expiryDate: { $lt: new Date() },
      isApproved: false,
    });

    const notifications = [];

    for (const poll of expiredUnapprovedPolls) {
      const notification = await Notification.findOne({ message: poll._id })

      notification.course=await Course.findOne({_id:notification.course})
      if(notification.prof){
        notification.prof=await Professor.findOne({_id:notification.prof})
      }
      notification.message=await Poll.findOne({_id:notification.message})

      if (!notification) continue;
      if(notification.type=="poll"){
        notifications.push(notification);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Fetched all expired and unapproved polls",
        notifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching polls:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error connecting to database",
        error,
      },
      { status: 500 }
    );
  }

  try {
    const { pollId, status } = await req.json();
    if (!pollId) {
      return NextResponse.json(
        {
          success: false,
          message: "Provide the Poll ID to verify",
        },
        { status: 400 }
      );
    }
    console.log(pollId,status);
    const notification=await Notification.findOne({_id:pollId});
    if(notification==null){
      return NextResponse.json(
        {
          success: false,
          message: "Notification not found",
        },
        { status: 404 }
      );
    }
    if(notification.type!="poll"){
      return NextResponse.json(
        {
          success: false,
          message: "Notification is not a poll",
        },
        { status: 400 }
      );
    }
    const pollToBeApproved = await Poll.findOne({_id:notification.message});
    if (pollToBeApproved==null) {
      return NextResponse.json(
        {
          success: false,
          message: "Poll not found",
        },
        { status: 404 }
      );
    }

    if (pollToBeApproved.isApproved) {
      return NextResponse.json(
        {
          success: true,
          message: "Poll was already approved",
        },
        { status: 200 }
      );
    }

    // Count votes per option._id
    const voteCounts = {};
    for (const vote of pollToBeApproved.votes) {
      const optionId = vote.option.toString();
      voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
    }

    // Find the option with the most votes
    const topVotedOptionId = Object.entries(voteCounts).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0];

    if (!topVotedOptionId) {
      return NextResponse.json(
        {
          success: false,
          message: "No votes found to determine top option",
        },
        { status: 400 }
      );
    }

    const topOption = pollToBeApproved.options.find(
      (opt) => opt._id.toString() === topVotedOptionId
    );

    if (!topOption) {
      return NextResponse.json(
        {
          success: false,
          message: "Top voted option not found in poll options",
        },
        { status: 404 }
      );
    }

    // Create new Slot from the top voted option
    if (status == true) {
      const newSlotBooking = new Slot({
        day: topOption.day,
        date: topOption.date,
        start: topOption.start,
        end: topOption.end,
        room: topOption.room,
      });

      await newSlotBooking.save();
      notification.course=await Course.findOne({_id:notification.course});
      const newNotification = new Notification({
        message:
          `The Poll for the ${notification.course.courseCode} has been approved by the Admin and the selected timeslot on ${topOption.day} at ${new Date(topOption.date).toLocaleDateString()} from ${new Date(topOption.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${new Date(topOption.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        messageTitle: "Poll approval message",
        type: "poll update",
      });
      
      await newNotification.save();
      await Student.updateMany(
        { _id: { $in: notification.course.enrolledStudents } },
        {
          $push: {
            notifications: {
              notification: newNotification._id,
              isRead: false,
            },
          },
        }
      );
      await Professor.updateMany(
        {
          _id: { $in: notification.course.prof },
        },
        {
          $push: {
            notifications: {
              notification: newNotification._id,
              isRead: false,
            },
          },
        }
      );
    } else {
      notification.course=await Course.findOne({_id:notification.course});
      const newNotification=new Notification({
        message:
          `The Poll for the  ${notification.course.courseCode} has been disapproved by the Admin`,
        messageTitle: "Poll disapproval message",
        type: "poll update",
      });
      await newNotification.save()
       await Professor.updateMany(
        {
          _id: { $in: notification.course.prof },
        },
        {
          $push: {
            notifications: {
              notification: newNotification._id,
              isRead: false,
            },
          },
        }
      );
    }

    // Mark poll as approved
    pollToBeApproved.isApproved = true;
    await pollToBeApproved.save();

    return NextResponse.json(
      {
        success: true,
        message: "Poll status updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error approving poll:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error,
      },
      { status: 500 }
    );
  }
}