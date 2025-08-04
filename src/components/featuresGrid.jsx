// import { Calendar, Users, MessageSquare, Vote, BookOpen, Settings, Bell, Shield, AlertTriangle } from "lucide-react"

// const features = [
//   {
//     title: "Timetable Management",
//     icon: Calendar,
//     bgColor: "bg-blue-100",
//     iconColor: "text-blue-600",
//     borderColor: "border-blue-200",
//   },
//   {
//     title: "Course Management",
//     icon: BookOpen,
//     bgColor: "bg-purple-100",
//     iconColor: "text-purple-600",
//     borderColor: "border-purple-200",
//   },
//   {
//     title: "Student Portal",
//     icon: Users,
//     bgColor: "bg-pink-100",
//     iconColor: "text-pink-600",
//     borderColor: "border-pink-200",
//   },
//   {
//     title: "Polls & Voting",
//     icon: Vote,
//     bgColor: "bg-green-100",
//     iconColor: "text-green-600",
//     borderColor: "border-green-200",
//   },
//   {
//     title: "Role Based Access",
//     icon: Shield,
//     bgColor: "bg-orange-100",
//     iconColor: "text-orange-600",
//     borderColor: "border-orange-200",
//   },
//   {
//     title: "Admin Controls",
//     icon: Settings,
//     bgColor: "bg-gray-100",
//     iconColor: "text-gray-600",
//     borderColor: "border-gray-200",
//   },
//   {
//     title: "Messages",
//     icon: MessageSquare,
//     bgColor: "bg-yellow-100",
//     iconColor: "text-yellow-600",
//     borderColor: "border-yellow-200",
//   },
//   {
//     title: "Auto Conflict Detection",
//     icon: AlertTriangle,
//     bgColor: "bg-indigo-100",
//     iconColor: "text-indigo-600",
//     borderColor: "border-indigo-200",
//   },
//   {
//     title: "Notifications",
//     icon: Bell,
//     bgColor: "bg-teal-100",
//     iconColor: "text-teal-600",
//     borderColor: "border-teal-200",
//   },
// ]

// export function FeaturesGrid() {
//   return (
//     <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-2xl shadow-lg max-w-md">
//       {features.map((feature, index) => {
//         const IconComponent = feature.icon
//         return (
//           <div
//             key={index}
//             className={`
//               ${feature.bgColor} 
//               ${feature.borderColor}
//               border-2 rounded-2xl p-4 flex flex-col items-center justify-center 
//               text-center space-y-2 hover:shadow-md transition-shadow cursor-pointer
//               aspect-square
//             `}
//           >
//             <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
//             <span className="text-sm font-medium text-gray-700 leading-tight">{feature.title}</span>
//           </div>
//         )
//       })}
//     </div>
//   )
// }



import { Calendar, Users, MessageSquare, Vote, BookOpen, Settings, Bell, Shield, AlertTriangle } from "lucide-react"

const features = [
  {
    title: "Timetable Management",
    icon: Calendar,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    title: "Course Management",
    icon: BookOpen,
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    title: "Student Portal",
    icon: Users,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
    borderColor: "border-pink-200",
  },
  {
    title: "Polls & Voting",
    icon: Vote,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
  },
  {
    title: "RoleBased Access",
    icon: Shield,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200",
  },
  {
    title: "Admin Controls",
    icon: Settings,
    bgColor: "bg-gray-100",
    iconColor: "text-gray-600",
    borderColor: "border-gray-200",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
    borderColor: "border-yellow-200",
  },
  {
    title: "Conflict Detection",
    icon: AlertTriangle,
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200",
  },
  {
    title: "Notifications",
    icon: Bell,
    bgColor: "bg-teal-100",
    iconColor: "text-teal-600",
    borderColor: "border-teal-200",
  },
]

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg w-full max-w-[320px] sm:max-w-md">
      {features.map((feature, index) => {
        const IconComponent = feature.icon
        return (
          <div
            key={index}
            className={`${feature.bgColor} ${feature.borderColor} border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center text-center space-y-1 sm:space-y-2 hover:shadow-md transition-shadow cursor-pointer aspect-square min-h-[70px] sm:min-h-[90px]`}
          >
            <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.iconColor}`} />
            <span className="text-xs sm:text-sm font-medium text-gray-700 leading-tight px-1">{feature.title}</span>
          </div>
        )
      })}
    </div>
  )
}
