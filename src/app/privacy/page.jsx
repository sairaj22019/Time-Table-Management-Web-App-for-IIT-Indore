"use client"

import { motion } from "framer-motion"
import { HiShieldCheck, HiLockClosed, HiEye, HiUserGroup, HiGlobe, HiMail } from "react-icons/hi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025"

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: <HiEye className="w-5 h-5" />,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and email address (required for account creation)",
            "Student ID or Employee ID (for institutional verification)",
            "Profile information (department, semester, role)",
            "Contact preferences and communication settings",
          ],
        },
        {
          subtitle: "Academic Information",
          items: [
            "Course enrollment data and academic records",
            "Timetable and schedule information",
            "Assignment submissions and grades",
            "Attendance records and participation data",
          ],
        },
        {
          subtitle: "Usage Information",
          items: [
            "Device information (browser type, operating system)",
            "IP address and location data (for security purposes)",
            "App usage patterns and feature interactions",
            "Log files and error reports for system improvement",
          ],
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: <HiUserGroup className="w-5 h-5" />,
      content: [
        {
          subtitle: "Core Services",
          items: [
            "Provide and maintain your academic timetable",
            "Enable course enrollment and management",
            "Facilitate communication between students and professors",
            "Generate academic reports and analytics",
          ],
        },
        {
          subtitle: "Service Improvement",
          items: [
            "Analyze usage patterns to improve app functionality",
            "Develop new features based on user needs",
            "Troubleshoot technical issues and bugs",
            "Ensure system security and prevent unauthorized access",
          ],
        },
        {
          subtitle: "Communication",
          items: [
            "Send important academic notifications and updates",
            "Provide customer support and respond to inquiries",
            "Share system maintenance and downtime notifications",
            "Deliver requested information about courses and schedules",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: <HiGlobe className="w-5 h-5" />,
      content: [
        {
          subtitle: "Within Your Institution",
          items: [
            "Academic information shared with authorized faculty and staff",
            "Attendance and participation data with relevant professors",
            "Administrative data with academic advisors and registrars",
            "Emergency contact information with designated personnel",
          ],
        },
        {
          subtitle: "Third-Party Services",
          items: [
            "Authentication services (for secure login)",
            "Cloud storage providers (for data backup and availability)",
            "Analytics services (for app improvement, anonymized data only)",
            "Email services (for notifications and communications)",
          ],
        },
        {
          subtitle: "Legal Requirements",
          items: [
            "Compliance with applicable laws and regulations",
            "Response to valid legal requests and court orders",
            "Protection of our rights and property",
            "Prevention of fraud and security threats",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <HiLockClosed className="w-5 h-5" />,
      content: [
        {
          subtitle: "Technical Safeguards",
          items: [
            "End-to-end encryption for sensitive data transmission",
            "Secure database storage with access controls",
            "Regular security audits and vulnerability assessments",
            "Multi-factor authentication for administrative access",
          ],
        },
        {
          subtitle: "Operational Security",
          items: [
            "Limited access to personal data on a need-to-know basis",
            "Regular employee training on data protection practices",
            "Incident response procedures for security breaches",
            "Regular backup and disaster recovery protocols",
          ],
        },
      ],
    },
    {
      id: "user-rights",
      title: "Your Rights and Choices",
      icon: <HiShieldCheck className="w-5 h-5" />,
      content: [
        {
          subtitle: "Access and Control",
          items: [
            "View and download your personal data",
            "Update or correct inaccurate information",
            "Delete your account and associated data",
            "Control communication preferences and notifications",
          ],
        },
        {
          subtitle: "Privacy Settings",
          items: [
            "Manage visibility of your profile information",
            "Control sharing of academic information with peers",
            "Opt-out of non-essential communications",
            "Request data portability to another service",
          ],
        },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <HiShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </motion.div>

            <p className="text-gray-600 text-lg mb-4">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                GDPR Compliant
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Last Updated: {lastUpdated}
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Educational Use
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Quick Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <HiLockClosed className="w-5 h-5 text-blue-600" />
                Privacy at a Glance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <HiEye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">What We Collect</h3>
                  <p className="text-sm text-gray-600">Only essential academic and contact information</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <HiShieldCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">How We Protect</h3>
                  <p className="text-sm text-gray-600">Industry-standard encryption and security measures</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <HiUserGroup className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">Your Control</h3>
                  <p className="text-sm text-gray-600">Full access, correction, and deletion rights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 3) }}
            >
              <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      {section.icon}
                      <span className="sr-only">{section.title}</span>
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {section.content.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h4 className="font-semibold text-gray-800 mb-3 text-lg">{subsection.subtitle}</h4>
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {subIndex < section.content.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Important Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 space-y-6"
        >
          {/* Cookies and Tracking */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-lg rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg">
                  <HiGlobe className="w-5 h-5 text-white" />
                </div>
                Cookies and Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar technologies to enhance your experience, remember your preferences, and
                  analyze app usage. You can control cookie settings through your browser preferences.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Types of Cookies We Use:</h4>
                  <ul className="space-y-1 text-orange-700">
                    <li>
                      • <strong>Essential:</strong> Required for basic app functionality
                    </li>
                    <li>
                      • <strong>Functional:</strong> Remember your preferences and settings
                    </li>
                    <li>
                      • <strong>Analytics:</strong> Help us understand how you use the app
                    </li>
                    <li>
                      • <strong>Security:</strong> Protect against fraud and unauthorized access
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-lg rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                  <HiLockClosed className="w-5 h-5 text-white" />
                </div>
                Data Retention
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal information only as long as necessary to provide our services and comply with
                  legal obligations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Active Accounts</h4>
                    <p className="text-green-700 text-sm">
                      Data is retained for as long as your account is active or as needed to provide services.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Deleted Accounts</h4>
                    <p className="text-blue-700 text-sm">
                      Most data deleted will be permanantly deleted and cannot be recovered there after.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          
        </motion.div>

        {/* Contact and Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8"
        >
          <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg rounded-2xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <HiMail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Questions or Concerns?</h3>
                <p className="text-gray-600 mb-6">
                  We're here to help with any privacy-related questions or concerns you may have.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/60 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Contact Our Privacy Team</h4>
                  <p className="text-gray-600 text-sm mb-3">privacy@yourinstitution.edu</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Send Email
                  </Button>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Data Protection Officer</h4>
                  <p className="text-gray-600 text-sm mb-3">dpo@yourinstitution.edu</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Contact DPO
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Policy Updates</h4>
                <p className="text-yellow-700 text-sm">
                  We may update this privacy policy from time to time. We will notify you of any material changes via
                  email or through the app. Continued use of our service after changes constitutes acceptance of the
                  updated policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-8 pb-8"
        >
          <p className="text-gray-500 text-sm">
            This privacy policy is effective as of {lastUpdated} and applies to all users of our educational platform.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
