// // // // // import { connectDB } from "@/dbConnection/ConnectDB";
// // // // // import Poll from "@/models/Polls.model";
// // // // // import Notification from "@/models/Notification.model";
// // // // // import Course from "@/models/Course.model";
// // // // // import { NextResponse } from "next/server";
// // // // // import { FcSalesPerformance } from "react-icons/fc";

// // // // // // Conflict checking logic
// // // // // async function checkConflicts(start, end, day) {
// // // // //   const allCourses = await Course.find({});
// // // // //   for (const course of allCourses) {
// // // // //     for (const sch of course.schedule) {
// // // // //       if (sch.day === day) {
// // // // //         const schStart = new Date(sch.start).getTime();
// // // // //         const schEnd = new Date(sch.end).getTime();
// // // // //         if (
// // // // //           schStart === new Date(start).getTime() &&
// // // // //           schEnd === new Date(end).getTime()
// // // // //         ) {
// // // // //           return true;
// // // // //         }
// // // // //       }
// // // // //     }
// // // // //   }
// // // // //   return false;
// // // // // }

// // // // // //This is to get all the approvable polls
// // // // // export async function GET(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //   } catch (error) {
// // // // //     return NextResponse.json({
// // // // //       success: false,
// // // // //       message: "Error connecting to DB",
// // // // //       error,
// // // // //     }, { status: 500 });
// // // // //   }

// // // // //   try {
// // // // //     const allPolls = await Poll.find({
// // // // //       expiryDate: { $lte: Date.now() },
// // // // //       isApproved: false,
// // // // //     });

// // // // //     const evaluatedPolls = [];

// // // // //     for (const poll of allPolls) {
// // // // //       const notification = await Notification.findOne({ message: poll._id });
// // // // //       if (!notification) continue;

// // // // //       const voteCounts = {};
// // // // //       for (const vote of poll.votes) {
// // // // //         const optionId = vote.option.toString();
// // // // //         voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
// // // // //       }

// // // // //       const sortedOptionIds = Object.entries(voteCounts)
// // // // //         .sort((a, b) => b[1] - a[1])
// // // // //         .map(([optionId]) => optionId);

// // // // //       for (let i = 0; i < poll.options.length; i++) {
// // // // //         const option = poll.options[i];
// // // // //         const conflict = await checkConflicts(option.start, option.end, option.day);
// // // // //         option.set("isAvailable", !conflict);
// // // // //       }

// // // // //       // for (const optionId of sortedOptionIds) {
// // // // //       //   const optionIndex = poll.options.findIndex(opt => opt._id.toString() === optionId);
// // // // //       //   const option = poll.options[optionIndex];
// // // // //       //   if (!option) continue;
// // // // //       //   if (option.isApproved === true) continue;

// // // // //       //   if (option.isAvailable) {
// // // // //       //     poll.isApproved = true;
// // // // //       //     poll.set("approvedOption", optionIndex);
// // // // //       //     console.log(`✅ Poll ${poll._id} auto-approved with option index ${poll.approvedOption}`);
// // // // //       //   }
// // // // //       // }

// // // // //       await poll.save();
// // // // //       evaluatedPolls.push(poll);
// // // // //     }

// // // // //     return NextResponse.json({
// // // // //       success: true,
// // // // //       message: "Processed and evaluated polls with availability status",
// // // // //       evaluatedPolls,
// // // // //     }, { status: 200 });

// // // // //   } catch (error) {
// // // // //     console.error("Error processing polls:", error);
// // // // //     return NextResponse.json({
// // // // //       success: false,
// // // // //       message: "Internal server error",
// // // // //       error,
// // // // //     }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // // This is the step where the admin approves the option of their choice
// // // // // export async function POST(req) {
// // // // //   try {
// // // // //     await connectDB();
// // // // //   } catch (error) {
// // // // //     return NextResponse.json({
// // // // //       success: false,
// // // // //       message: "Error connecting to database",
// // // // //       error: error,
// // // // //     }, { status: 500 });
// // // // //   }

// // // // //   try {
// // // // //     const { pollId, optionId } = await req.json();

// // // // //     const poll = await Poll.findById(pollId);
// // // // //     if (!poll) {
// // // // //       return NextResponse.json({
// // // // //         success: false,
// // // // //         message: "Poll not found",
// // // // //       }, { status: 404 });
// // // // //     }

// // // // //     // Update options' isApproved field
// // // // //     poll.options.forEach((option, index) => {
// // // // //       if (option._id.toString() === optionId) {
// // // // //         option.set("isApproved", true);
// // // // //         poll.set("approvedOption", index);
// // // // //       } else {
// // // // //         option.set("isApproved", false);
// // // // //       }
// // // // //     });

// // // // //     poll.isApproved = true;
// // // // //     await poll.save();

// // // // //     // 🔍 Get the original poll notification to trace course
// // // // //     const oldNotification = await Notification.findOne({ message: poll._id });
// // // // //     if (!oldNotification) {
// // // // //       return NextResponse.json({
// // // // //         success: false,
// // // // //         message: "Notification linking poll to course not found",
// // // // //       }, { status: 404 });
// // // // //     }

// // // // //     // 🔍 Find course using old notification’s course field
// // // // //     const course = await Course.findById(oldNotification.course);
// // // // //     if (!course) {
// // // // //       return NextResponse.json({
// // // // //         success: false,
// // // // //         message: "Course not found",
// // // // //       }, { status: 404 });
// // // // //     }

// // // // //     // 🛎️ Create new notification for poll approval
// // // // //     const newNotification = new Notification({
// // // // //       course: course._id,
// // // // //       messageTitle:"Poll desicion",
// // // // //       message: `Poll "${poll.title}" has been approved.`,
// // // // //       type:"poll update",
// // // // //     });
// // // // //     await newNotification.save();

// // // // //     // 🧑‍🎓 Push notification to enrolled students
// // // // //     await Promise.all(
// // // // //       course.enrolledStudents.map(async (studentId) => {
// // // // //         const student = await import("@/models/Student.model").then(mod => mod.default.findById(studentId));
// // // // //         if (student) {
// // // // //           student.notifications.push({notification:newNotification._id,isRead:false});
// // // // //           await student.save();
// // // // //         }
// // // // //       })
// // // // //     );

// // // // //     // 👨‍🏫 Push notification to professors
// // // // //     await Promise.all(
// // // // //       course.professors.map(async (professorId) => {
// // // // //         const professor = await import("@/models/Professor.model").then(mod => mod.default.findById(professorId));
// // // // //         if (professor) {
// // // // //           professor.notifications.push({notification:newNotification._id,isRead:false});
// // // // //           await professor.save();
// // // // //         }
// // // // //       })
// // // // //     );

// // // // //     return NextResponse.json({
// // // // //       success: true,
// // // // //       message: `Option approved and notification sent successfully for poll ${pollId}`,
// // // // //     }, { status: 200 });

// // // // //   } catch (error) {
// // // // //     return NextResponse.json({
// // // // //       success: false,
// // // // //       message: "Internal server error",
// // // // //       error: error,
// // // // //     }, { status: 500 });
// // // // //   }
// // // // // }

// // // // import { connectDB } from "@/dbConnection/ConnectDB";
// // // // import Poll from "@/models/Polls.model";
// // // // import Notification from "@/models/Notification.model";
// // // // import Course from "@/models/Course.model";
// // // // import { NextResponse } from "next/server";

// // // // // Conflict checking logic
// // // // async function checkConflicts(start, end, day) {
// // // //   const allCourses = await Course.find({});
// // // //   for (const course of allCourses) {
// // // //     for (const sch of course.schedule) {
// // // //       if (sch.day === day) {
// // // //         const schStart = new Date(sch.start).getTime();
// // // //         const schEnd = new Date(sch.end).getTime();
// // // //         if (
// // // //           schStart === new Date(start).getTime() &&
// // // //           schEnd === new Date(end).getTime()
// // // //         ) {
// // // //           return true;
// // // //         }
// // // //       }
// // // //     }
// // // //   }
// // // //   return false;
// // // // }

// // // // // GET: Get all unapproved expired polls and check availability
// // // // export async function GET(req) {
// // // //   try {
// // // //     await connectDB();
// // // //   } catch (error) {
// // // //     return NextResponse.json({
// // // //       success: false,
// // // //       message: "Error connecting to DB",
// // // //       error,
// // // //     }, { status: 500 });
// // // //   }

// // // //   try {
// // // //     const allPolls = await Poll.find({
// // // //       expiryDate: { $lte: Date.now() },
// // // //       isApproved: false,
// // // //     });

// // // //     const evaluatedPolls = [];

// // // //     for (const poll of allPolls) {
// // // //       const notification = await Notification.findOne({ message: poll._id });
// // // //       if (!notification) continue;

// // // //       const voteCounts = {};
// // // //       for (const vote of poll.votes) {
// // // //         const optionId = vote.option.toString();
// // // //         voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
// // // //       }

// // // //       const sortedOptionIds = Object.entries(voteCounts)
// // // //         .sort((a, b) => b[1] - a[1])
// // // //         .map(([optionId]) => optionId);

// // // //       for (let i = 0; i < poll.options.length; i++) {
// // // //         const option = poll.options[i];
// // // //         const conflict = await checkConflicts(option.start, option.end, option.day);
// // // //         option.isAvailable = !conflict; // ✅ dynamic assignment
// // // //       }

// // // //       // Auto-approval logic is commented out
// // // //       await poll.save();
// // // //       evaluatedPolls.push(poll);
// // // //     }

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       message: "Processed and evaluated polls with availability status",
// // // //       evaluatedPolls,
// // // //     }, { status: 200 });

// // // //   } catch (error) {
// // // //     console.error("Error processing polls:", error);
// // // //     return NextResponse.json({
// // // //       success: false,
// // // //       message: "Internal server error",
// // // //       error,
// // // //     }, { status: 500 });
// // // //   }
// // // // }

// // // // // POST: Admin approves selected option in poll and sends notifications
// // // // export async function POST(req) {
// // // //   try {
// // // //     await connectDB();
// // // //   } catch (error) {
// // // //     return NextResponse.json({
// // // //       success: false,
// // // //       message: "Error connecting to database",
// // // //       error: error,
// // // //     }, { status: 500 });
// // // //   }

// // // //   try {
// // // //     const { pollId, optionId } = await req.json();
// // // //     const poll = await Poll.findById(pollId);
// // // //     if (!poll) {
// // // //       return NextResponse.json({
// // // //         success: false,
// // // //         message: "Poll not found",
// // // //       }, { status: 404 });
// // // //     }

// // // //     // Update option approval dynamically
// // // //     poll.options.forEach((option, index) => {
// // // //       option.isApproved = (option._id.toString() === optionId);
// // // //       if (option.isApproved) {
// // // //         poll.approvedOption = index; // ✅ dynamic assignment
// // // //       }
// // // //     });

// // // //     poll.isApproved = true;
// // // //     await poll.save();

// // // //     // Get original notification and course
// // // //     const oldNotification = await Notification.findOne({ message: poll._id });
// // // //     if (!oldNotification) {
// // // //       return NextResponse.json({
// // // //         success: false,
// // // //         message: "Notification linking poll to course not found",
// // // //       }, { status: 404 });
// // // //     }

// // // //     const course = await Course.findById(oldNotification.course);
// // // //     if (!course) {
// // // //       return NextResponse.json({
// // // //         success: false,
// // // //         message: "Course not found",
// // // //       }, { status: 404 });
// // // //     }

// // // //     // Create new notification
// // // //     const newNotification = new Notification({
// // // //       course: course._id,
// // // //       messageTitle: "Poll decision",
// // // //       message: `Poll "${poll.title}" has been approved.`,
// // // //       type: "poll update",
// // // //       date: new Date(),
// // // //     });
// // // //     await newNotification.save();

// // // //     // Push to all students
// // // //     await Promise.all(
// // // //       course.enrolledStudents.map(async (studentId) => {
// // // //         const student = await import("@/models/Student.model").then(mod => mod.default.findById(studentId));
// // // //         if (student) {
// // // //           student.notifications.push({ notification: newNotification._id, isRead: false });
// // // //           await student.save();
// // // //         }
// // // //       })
// // // //     );

// // // //     // Push to all professors
// // // //     await Promise.all(
// // // //       course.professors.map(async (professorId) => {
// // // //         const professor = await import("@/models/Professor.model").then(mod => mod.default.findById(professorId));
// // // //         if (professor) {
// // // //           professor.notifications.push({ notification: newNotification._id, isRead: false });
// // // //           await professor.save();
// // // //         }
// // // //       })
// // // //     );

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       message: `Option approved and notification sent successfully for poll ${pollId}`,
// // // //     }, { status: 200 });

// // // //   } catch (error) {
// // // //     return NextResponse.json({
// // // //       success: false,
// // // //       message: "Internal server error",
// // // //       error: error,
// // // //     }, { status: 500 });
// // // //   }
// // // // }
// // // import { connectDB } from "@/dbConnection/ConnectDB";
// // // import Poll from "@/models/Polls.model";
// // // import Notification from "@/models/Notification.model";
// // // import Course from "@/models/Course.model";
// // // import { NextResponse } from "next/server";

// // // // Conflict checking logic
// // // async function checkConflicts(start, end, day) {
// // //   const allCourses = await Course.find({});
// // //   for (const course of allCourses) {
// // //     for (const sch of course.schedule) {
// // //       if (sch.day === day) {
// // //         const schStart = new Date(sch.start).getTime();
// // //         const schEnd = new Date(sch.end).getTime();
// // //         if (
// // //           schStart === new Date(start).getTime() &&
// // //           schEnd === new Date(end).getTime()
// // //         ) {
// // //           return true;
// // //         }
// // //       }
// // //     }
// // //   }
// // //   return false;
// // // }

// // // // GET: Get all unapproved expired polls and check availability
// // // export async function GET(req) {
// // //   try {
// // //     await connectDB();
// // //   } catch (error) {
// // //     return NextResponse.json({
// // //       success: false,
// // //       message: "Error connecting to DB",
// // //       error,
// // //     }, { status: 500 });
// // //   }

// // //   try {
// // //     const allPolls = await Poll.find({
// // //       expiryDate: { $lte: Date.now() },
// // //       isApproved: false,
// // //     });

// // //     const evaluatedPolls = [];

// // //     for (const poll of allPolls) {
// // //       const notification = await Notification.findOne({ message: poll._id });
// // //       if (!notification) continue;

// // //       const voteCounts = {};
// // //       for (const vote of poll.votes) {
// // //         const optionId = vote.option.toString();
// // //         voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
// // //       }

// // //       const sortedOptionIds = Object.entries(voteCounts)
// // //         .sort((a, b) => b[1] - a[1])
// // //         .map(([optionId]) => optionId);

// // //       // Add isAvailable to each option
// // //       for (let i = 0; i < poll.options.length; i++) {
// // //         const option = poll.options[i];
// // //         const conflict = await checkConflicts(option.start, option.end, option.day);
// // //         option.isAvailable = !conflict; // ✅ Add dynamically
// // //       }

// // //       // Ensure Mongoose tracks these dynamic changes
// // //       poll.markModified('options');
// // //       await poll.save();

// // //       // Convert poll to plain object to keep isAvailable in response
// // //       evaluatedPolls.push(poll.toObject());
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       message: "Processed and evaluated polls with availability status",
// // //       evaluatedPolls,
// // //     }, { status: 200 });

// // //   } catch (error) {
// // //     console.error("Error processing polls:", error);
// // //     return NextResponse.json({
// // //       success: false,
// // //       message: "Internal server error",
// // //       error,
// // //     }, { status: 500 });
// // //   }
// // // }
// // import { connectDB } from "@/dbConnection/ConnectDB";
// // import Poll from "@/models/Polls.model";
// // import Notification from "@/models/Notification.model";
// // import Course from "@/models/Course.model";
// // import { NextResponse } from "next/server";

// // // Conflict checking logic
// // async function checkConflicts(start, end, day) {
// //   const allCourses = await Course.find({});
// //   for (const course of allCourses) {
// //     for (const sch of course.schedule) {
// //       if (sch.day === day) {
// //         const schStart = new Date(sch.start).getTime();
// //         const schEnd = new Date(sch.end).getTime();
// //         if (
// //           schStart === new Date(start).getTime() &&
// //           schEnd === new Date(end).getTime()
// //         ) {
// //           return true;
// //         }
// //       }
// //     }
// //   }
// //   return false;
// // }

// // // GET: Get all unapproved expired polls and evaluate availability
// // export async function GET(req) {
// //   try {
// //     await connectDB();
// //   } catch (error) {
// //     return NextResponse.json({
// //       success: false,
// //       message: "Error connecting to DB",
// //       error,
// //     }, { status: 500 });
// //   }

// //   try {
// //     const allPolls = await Poll.find({
// //       expiryDate: { $lte: Date.now() },
// //       isApproved: false,
// //     });

// //     const evaluatedPolls = [];

// //     for (const poll of allPolls) {
// //       const notification = await Notification.findOne({ message: poll._id });
// //       if (!notification) continue;

// //       const voteCounts = {};
// //       for (const vote of poll.votes) {
// //         const optionId = vote.option.toString();
// //         voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
// //       }

// //       const sortedOptionIds = Object.entries(voteCounts)
// //         .sort((a, b) => b[1] - a[1])
// //         .map(([optionId]) => optionId);

// //       // Add isAvailable to each option
// //       for (let i = 0; i < poll.options.length; i++) {
// //         const option = poll.options[i];
// //         const conflict = await checkConflicts(option.start, option.end, option.day);
// //         option.isAvailable = !conflict;
// //       }

// //       // Mark options as modified and save
// //       poll.markModified("options");
// //       await poll.save();

// //       // Manually construct object to ensure isAvailable is in the response
// //       const pollObj = poll.toObject();
// //       pollObj.options = poll.options.map((opt) => ({
// //         ...opt.toObject(),
// //         isAvailable: opt.isAvailable,
// //       }));

// //       evaluatedPolls.push(pollObj);
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: "Processed and evaluated polls with availability status",
// //       evaluatedPolls,
// //     }, { status: 200 });

// //   } catch (error) {
// //     console.error("Error processing polls:", error);
// //     return NextResponse.json({
// //       success: false,
// //       message: "Internal server error",
// //       error,
// //     }, { status: 500 });
// //   }
// // }
// // import { connectDB } from "@/dbConnection/ConnectDB";
// // import Notification from "@/models/Notification.model";
// // import Poll from "@/models/Polls.model";
// // import Professor from "@/models/Professor.model";
// // import Slot from "@/models/slot.model";
// // import { NextResponse } from "next/server";
// // import Course from "@/models/Course.model";
// // export async function GET(req) {
// //   try {
// //     await connectDB();
// //   } catch (error) {
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: "Error connecting to database",
// //         error: error,
// //       },
// //       { status: 500 }
// //     );
// //   }
// //   try {
// //     const expiredUnapprovedPolls = await Poll.find({
// //       expiryDate: { $lt: new Date() },
// //       isApproved: false,
// //     });
// //     const notifications=[];
// //     for(const poll of expiredUnapprovedPolls){
// //       const notification=await Notification.findOne({message:poll._id})
// //       if(!notification) continue;
// //       const course=await Course.findById(notification.course)
// //       if(!course) continue;
// //       const professor=await Professor.findById(course.prof)
// //       notifications.push({
// //         course:course.courseCode,
// //         professor:professor.name,
// //         notification:notification.message,
// //       })
// //     }
// //     return NextResponse.json(
// //       {
// //         success: true,
// //         message: "Fetched all expired and unapproved polls",
// //         notifications: notifications,
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Error fetching polls:", error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: "Internal server error",
// //         error,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function POST(req) {
// //   try {
// //     await connectDB();
// //   } catch (error) {
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: "Error connecting to database",
// //         error,
// //       },
// //       { status: 500 }
// //     );
// //   }

// //   try {
// //     const { pollId, status } = await req.json();
// //     if (!pollId) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "Provide the Poll ID to verify",
// //         },
// //         { status: 400 }
// //       );
// //     }

// //     const pollToBeApproved = await Poll.findById(pollId);
// //     if (!pollToBeApproved) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "Poll not found",
// //         },
// //         { status: 404 }
// //       );
// //     }

// //     if (pollToBeApproved.isApproved) {
// //       return NextResponse.json(
// //         {
// //           success: true,
// //           message: "Poll was already approved",
// //         },
// //         { status: 200 }
// //       );
// //     }

// //     // Count votes per option._id
// //     const voteCounts = {};
// //     for (const vote of pollToBeApproved.votes) {
// //       const optionId = vote.option.toString();
// //       voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
// //     }

// //     // Find the option with the most votes
// //     const topVotedOptionId = Object.entries(voteCounts).sort(
// //       (a, b) => b[1] - a[1]
// //     )[0]?.[0];

// //     if (!topVotedOptionId) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "No votes found to determine top option",
// //         },
// //         { status: 400 }
// //       );
// //     }

// //     const topOption = pollToBeApproved.options.find(
// //       (opt) => opt._id.toString() === topVotedOptionId
// //     );

// //     if (!topOption) {
// //       return NextResponse.json(
// //         {
// //           success: false,
// //           message: "Top voted option not found in poll options",
// //         },
// //         { status: 404 }
// //       );
// //     }

// //     // Create new Slot from the top voted option
// //     if (status == true) {
// //       const newSlotBooking = new Slot({
// //         day: topOption.day,
// //         date: topOption.date,
// //         start: topOption.start,
// //         end: topOption.end,
// //         room: topOption.room,
// //       });

// //       await newSlotBooking.save();
// //       const notificationOfThePoll = await Notification.findOne({
// //         message: pollId,
// //       });
// //       await notificationOfThePoll.populate("course");
// //       const newNotification = new Notification({
// //         message:
// //           `The Poll for the  ${notificationOfThePoll.course.courseCode} has been approved by the Admin and the selected timeslot on ${topOption.day} at ${topOption.date} from ${topOption.start} to ${topOption.end}`,
// //         messageTitle: "Poll approval message",
// //         type: "poll update",
// //       });
// //       await newNotification.save();
// //       await Student.updateMany(
// //         { _id: { $in: notificationOfThePoll.course.enrolledStudents } },
// //         {
// //           $push: {
// //             notifications: {
// //               notification: newNotification._id,
// //               isRead: false,
// //             },
// //           },
// //         }
// //       );
// //       await Professor.updateMany(
// //         {
// //           _id: { $in: notificationOfThePoll.course.prof },
// //         },
// //         {
// //           $push: {
// //             notifications: {
// //               notification: newNotification._id,
// //               isRead: false,
// //             },
// //           },
// //         }
// //       );
// //     } else {
// //       const notificationOfThePoll = await Notification.findOne({
// //         message: pollId,
// //       });
// //       await notificationOfThePoll.populate("course");
// //       const newNotification=new Notification({
// //         message:
// //           `The Poll for the  ${notificationOfThePoll.course.courseCode} has been disapproved by the Admin`,
// //         messageTitle: "Poll disapproval message",
// //         type: "poll update",
// //       });
// //       await newNotification.save()
// //        await Professor.updateMany(
// //         {
// //           _id: { $in: notificationOfThePoll.course.prof },
// //         },
// //         {
// //           $push: {
// //             notifications: {
// //               notification: newNotification._id,
// //               isRead: false,
// //             },
// //           },
// //         }
// //       );
// //     }

// //     // Mark poll as approved
// //     pollToBeApproved.isApproved = true;
// //     await pollToBeApproved.save();

// //     return NextResponse.json(
// //       {
// //         success: true,
// //         message: "Poll status updated successfully",
// //       },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: "Internal server error",
// //         error,
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { connectDB } from "@/dbConnection/ConnectDB";
// import Notification from "@/models/Notification.model";
// import Poll from "@/models/Polls.model";
// import Professor from "@/models/Professor.model";
// import Slot from "@/models/slot.model";
// import { NextResponse } from "next/server";
// import Course from "@/models/Course.model";
// export async function GET(req) {
//   try {
//     await connectDB();
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error connecting to database",
//         error,
//       },
//       { status: 500 }
//     );
//   }

//   try {
//     const expiredUnapprovedPolls = await Poll.find({
//       expiryDate: { $lt: new Date() },
//       isApproved: false,
//     });

//     const notifications = [];

//     for (const poll of expiredUnapprovedPolls) {
//       const notification = await Notification.findOne({ message: poll._id })

//       notification.course=await Course.findOne({_id:notification.course})
//       if(notification.prof){
//         notification.prof=await Professor.findOne({_id:notification.prof})
//       }
//       notification.message=await Poll.findOne({_id:notification.message})

//       if (!notification) continue;
//       notifications.push(notification);
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Fetched all expired and unapproved polls",
//         notifications,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching polls:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     await connectDB();
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Error connecting to database",
//         error,
//       },
//       { status: 500 }
//     );
//   }

//   try {
//     const { pollId, status } = await req.json();
//     if (!pollId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Provide the Poll ID to verify",
//         },
//         { status: 400 }
//       );
//     }

//     const pollToBeApproved = await Poll.findOne({_id:pollId});
//     if (!pollToBeApproved) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Poll not found",
//         },
//         { status: 404 }
//       );
//     }

//     if (pollToBeApproved.isApproved) {
//       return NextResponse.json(
//         {
//           success: true,
//           message: "Poll was already approved",
//         },
//         { status: 200 }
//       );
//     }

//     // Count votes per option._id
//     const voteCounts = {};
//     for (const vote of pollToBeApproved.votes) {
//       const optionId = vote.option.toString();
//       voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
//     }

//     // Find the option with the most votes
//     const topVotedOptionId = Object.entries(voteCounts).sort(
//       (a, b) => b[1] - a[1]
//     )[0]?.[0];

//     if (!topVotedOptionId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "No votes found to determine top option",
//         },
//         { status: 400 }
//       );
//     }

//     const topOption = pollToBeApproved.options.find(
//       (opt) => opt._id.toString() === topVotedOptionId
//     );

//     if (!topOption) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Top voted option not found in poll options",
//         },
//         { status: 404 }
//       );
//     }

//     // Create new Slot from the top voted option
//     if (status == true) {
//       const newSlotBooking = new Slot({
//         day: topOption.day,
//         date: topOption.date,
//         start: topOption.start,
//         end: topOption.end,
//         room: topOption.room,
//       });

//       await newSlotBooking.save();
//       const notificationOfThePoll = await Notification.findOne({
//         message: pollId,
//       });
//       await notificationOfThePoll.populate("course");
//       const newNotification = new Notification({
//         message:
//           `The Poll for the  ${notificationOfThePoll.course.courseCode} has been approved by the Admin and the selected timeslot on ${topOption.day} at ${topOption.date} from ${topOption.start} to ${topOption.end}`,
//         messageTitle: "Poll approval message",
//         type: "poll update",
//       });
//       await newNotification.save();
//       await Student.updateMany(
//         { _id: { $in: notificationOfThePoll.course.enrolledStudents } },
//         {
//           $push: {
//             notifications: {
//               notification: newNotification._id,
//               isRead: false,
//             },
//           },
//         }
//       );
//       await Professor.updateMany(
//         {
//           _id: { $in: notificationOfThePoll.course.prof },
//         },
//         {
//           $push: {
//             notifications: {
//               notification: newNotification._id,
//               isRead: false,
//             },
//           },
//         }
//       );
//     } else {
//       const notificationOfThePoll = await Notification.findOne({
//         message: pollId,
//       });
//       await notificationOfThePoll.populate("course");
//       const newNotification=new Notification({
//         message:
//           `The Poll for the  ${notificationOfThePoll.course.courseCode} has been disapproved by the Admin`,
//         messageTitle: "Poll disapproval message",
//         type: "poll update",
//       });
//       await newNotification.save()
//        await Professor.updateMany(
//         {
//           _id: { $in: notificationOfThePoll.course.prof },
//         },
//         {
//           $push: {
//             notifications: {
//               notification: newNotification._id,
//               isRead: false,
//             },
//           },
//         }
//       );
//     }

//     // Mark poll as approved
//     pollToBeApproved.isApproved = true;
//     await pollToBeApproved.save();

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Poll status updated successfully",
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error",
//         error,
//       },
//       { status: 500 }
//     );
//   }
// }
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