"use client"

import { motion } from "framer-motion"

export default function TermsOfServicePage() {
  const lastUpdated = "January 15, 2025"
  const effectiveDate = "January 15, 2025"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          items: [
            "By accessing or using our educational platform, you agree to be bound by these Terms of Service",
            "If you do not agree to these terms, you may not use our services",
            "These terms apply to all users, including students, faculty, and administrative staff",
            "Your institution may have additional terms that also apply to your use of the platform",
          ],
        },
        {
          subtitle: "Capacity to Accept",
          items: [
            "You must be at least 13 years old to use this service",
            "If you are under 18, you represent that you have parental consent",
            "You must be affiliated with a participating educational institution",
            "You have the authority to enter into this agreement on behalf of yourself or your institution",
          ],
        },
      ],
    },
    {
      id: "service-description",
      title: "Service Description",
      content: [
        {
          subtitle: "Platform Features",
          items: [
            "Academic timetable management and scheduling",
            "Course enrollment and registration services",
            "Communication tools between students and faculty",
            "Assignment submission and grading systems",
            "Academic progress tracking and reporting",
          ],
        },
        {
          subtitle: "Service Availability",
          items: [
            "Services are provided on an 'as available' basis",
            "We strive for 99.9% uptime but cannot guarantee uninterrupted service",
            "Scheduled maintenance will be announced in advance when possible",
            "Emergency maintenance may occur without prior notice",
          ],
        },
        {
          subtitle: "Service Modifications",
          items: [
            "We reserve the right to modify, suspend, or discontinue services",
            "New features may be added or existing features may be removed",
            "We will provide reasonable notice of significant changes",
            "Continued use after changes constitutes acceptance of modifications",
          ],
        },
      ],
    },
    {
      id: "user-accounts",
      title: "User Accounts and Responsibilities",
      content: [
        {
          subtitle: "Account Creation",
          items: [
            "You must provide accurate and complete information when creating an account",
            "You are responsible for maintaining the confidentiality of your login credentials",
            "You must notify us immediately of any unauthorized use of your account",
            "One person may not maintain multiple accounts without permission",
          ],
        },
        {
          subtitle: "User Conduct",
          items: [
            "Use the platform only for legitimate educational purposes",
            "Respect the intellectual property rights of others",
            "Do not share inappropriate, offensive, or harmful content",
            "Do not attempt to gain unauthorized access to any part of the system",
            "Do not interfere with or disrupt the platform's operation",
          ],
        },
        {
          subtitle: "Academic Integrity",
          items: [
            "Maintain academic honesty in all interactions on the platform",
            "Do not share assignment answers or engage in academic dishonesty",
            "Report any suspected violations of academic integrity policies",
            "Follow your institution's specific academic conduct guidelines",
          ],
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      content: [
        {
          subtitle: "Platform Ownership",
          items: [
            "The platform, including its design, code, and functionality, is our property",
            "All trademarks, logos, and service marks are owned by us or our licensors",
            "You may not copy, modify, or distribute our proprietary content",
            "Any feedback or suggestions you provide may be used by us without compensation",
          ],
        },
        {
          subtitle: "User Content",
          items: [
            "You retain ownership of content you create and submit through the platform",
            "You grant us a license to use your content to provide and improve our services",
            "You are responsible for ensuring you have rights to any content you upload",
            "We may remove content that violates these terms or applicable laws",
          ],
        },
        {
          subtitle: "Educational Materials",
          items: [
            "Course materials and academic content remain the property of their creators",
            "Use of educational materials is limited to legitimate academic purposes",
            "Redistribution of course materials outside the platform is prohibited",
            "Respect copyright and fair use guidelines for all educational content",
          ],
        },
      ],
    },
    {
      id: "privacy-data",
      title: "Privacy and Data Protection",
      content: [
        {
          subtitle: "Data Collection",
          items: [
            "We collect information necessary to provide educational services",
            "Your privacy is protected according to our Privacy Policy",
            "We comply with applicable data protection laws (GDPR, FERPA, etc.)",
            "You have rights regarding your personal data as outlined in our Privacy Policy",
          ],
        },
        {
          subtitle: "Educational Records",
          items: [
            "Academic records are protected under FERPA and similar regulations",
            "We share educational information only as permitted by law",
            "You can request access to your educational records",
            "Unauthorized disclosure of educational records is prohibited",
          ],
        },
      ],
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      content: [
        {
          subtitle: "Strictly Forbidden Activities",
          items: [
            "Hacking, cracking, or attempting to breach system security",
            "Uploading viruses, malware, or other malicious code",
            "Impersonating other users or providing false identity information",
            "Harvesting or collecting user information without consent",
            "Using the platform for commercial purposes without authorization",
          ],
        },
        {
          subtitle: "Content Restrictions",
          items: [
            "Posting illegal, harmful, or offensive content",
            "Sharing copyrighted material without proper authorization",
            "Distributing spam, advertisements, or unsolicited communications",
            "Publishing false or misleading information",
            "Engaging in harassment, bullying, or discriminatory behavior",
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
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Terms of Service
              </h1>
            </motion.div>

            <p className="text-gray-600 text-lg mb-4">
              Please read these terms carefully before using our educational platform. By using our service, you agree
              to these terms.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                Last Updated: {lastUpdated}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                Effective: {effectiveDate}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                Educational Platform
              </span>
            </div>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div className="text-amber-800">
                <strong>Important:</strong> These terms constitute a legally binding agreement between you and our
                educational platform. If you do not agree to these terms, please do not use our services. Your
                institution may have additional terms that also apply.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100 p-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Terms Overview
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <svg
                    className="w-8 h-8 text-blue-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-800 mb-1">User Responsibilities</h3>
                  <p className="text-sm text-gray-600">Maintain account security and follow academic integrity</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <svg
                    className="w-8 h-8 text-green-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-800 mb-1">Service Protection</h3>
                  <p className="text-sm text-gray-600">Respect intellectual property and platform security</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <svg
                    className="w-8 h-8 text-red-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-800 mb-1">Prohibited Activities</h3>
                  <p className="text-sm text-gray-600">No unauthorized access, spam, or harmful content</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 4) }}
            >
              <div className="shadow-lg border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100 p-6">
                  <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    {section.title}
                  </h2>
                </div>
                <div className="p-6">
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
                        {subIndex < section.content.length - 1 && <div className="border-t border-gray-200 mt-4"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
          {/* Disclaimers and Limitations */}
          <div className="shadow-lg border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 p-6">
              <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800">
                <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                Disclaimers and Limitations
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Service Disclaimers</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Services are provided "as is" without warranties of any kind
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        We do not guarantee the accuracy of all information on the platform
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Technical issues may occasionally affect service availability
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Limitation of Liability</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Our liability is limited to the maximum extent permitted by law
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        We are not liable for indirect, incidental, or consequential damages
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Users are responsible for backing up their important data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Termination */}
          <div className="shadow-lg border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 p-6">
              <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                Account Termination
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Termination by You</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        You may terminate your account at any time through account settings
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Some data may be retained for legal or administrative purposes
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Termination by Us</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        We may suspend or terminate accounts for violations of these terms
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Serious violations may result in immediate termination without notice
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        We will provide reasonable notice for non-urgent terminations
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="shadow-lg border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100 p-6">
              <h2 className="flex items-center gap-3 text-xl font-bold text-gray-800">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                Governing Law and Disputes
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Applicable Law</h4>
                  <p className="text-gray-700 leading-relaxed">
                    These terms are governed by the laws of the jurisdiction where your educational institution is
                    located, without regard to conflict of law principles. Educational regulations such as FERPA may
                    also apply.
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Dispute Resolution</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        We encourage resolving disputes through direct communication first
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">
                        Formal disputes may be subject to arbitration or court proceedings
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Your institution's grievance procedures may also apply</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact and Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8"
        >
          <div className="shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="p-8 text-center">
              <div className="mb-6">
                <svg
                  className="w-12 h-12 text-blue-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Questions About These Terms?</h3>
                <p className="text-gray-600 mb-6">
                  If you have questions about these terms of service, please don't hesitate to contact us.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/60 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Legal Team</h4>
                  <p className="text-gray-600 text-sm mb-3">legal@yourinstitution.edu</p>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Contact Legal
                  </button>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Support Team</h4>
                  <p className="text-gray-600 text-sm mb-3">support@yourinstitution.edu</p>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Get Support
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Terms Updates</h4>
                <p className="text-blue-700 text-sm">
                  We may update these terms from time to time. We will notify users of material changes via email or
                  through the platform. Your continued use after changes constitutes acceptance of the updated terms.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-8 pb-8"
        >
          <p className="text-gray-500 text-sm">
            These terms of service are effective as of {effectiveDate} and apply to all users of our educational
            platform.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </motion.div>
      </div>
    </main>
  )
}