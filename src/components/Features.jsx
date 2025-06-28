
import React from "react";
import { CheckCircle } from "lucide-react";

function Features() {
  const features = [
    "Centralized Course Management – Easily create, update, and manage courses and schedules",
    "Personalized Timetables – Get real-time schedules tailored to each user",
    "Smart Notifications – Stay updated with instant alerts for any changes",
    "Polls for Flexible Scheduling – Professors can create polls, students can vote",
    "Conflict Detection – Avoid overlapping schedules and room clashes",
    "Real-Time Updates – All changes reflect instantly across the platform",
  ];

  return (
    <div className="bg-indigo-50 mx-5 my-8 py-10 px-4 md:px-8 rounded-xl border border-indigo-300 shadow-sm">
      <h1 className="text-center text-3xl md:text-4xl font-bold text-slate-700 mb-2">
        Core Features That Simplify Scheduling
      </h1>
      <p className="text-center text-slate-600 text-base max-w-2xl mx-auto mb-8">
        Our platform is designed to streamline communication, automate updates, and give everyone the control they need — from students to administrators.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all"
          >
            <CheckCircle className="text-indigo-500 w-5 h-5 mt-1 flex-shrink-0" />
            <p className="text-slate-800 text-base">{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
