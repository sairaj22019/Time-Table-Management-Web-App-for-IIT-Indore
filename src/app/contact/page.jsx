"use client"

import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
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
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Contact Us
              </h1>
            </motion.div>

            <p className="text-gray-600 text-lg mb-4">
              Get in touch with us for any questions or support regarding our educational platform.
            </p>
          </div>
        </motion.div>

        {/* Main Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="shadow-xl border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="p-8 sm:p-12 text-center">
              {/* Contact Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8"
              >
                <div className="relative mx-auto w-32 h-32 sm:w-40 sm:h-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-16 h-16 sm:w-20 sm:h-20 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  {/* Decorative rings */}
                  <div className="absolute -inset-2 border-2 border-blue-200 rounded-full opacity-30 animate-pulse"></div>
                  <div className="absolute -inset-4 border border-purple-200 rounded-full opacity-20"></div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">We're Here to Help</h2>
                  <p className="text-gray-600 text-lg">Reach out to us for any assistance with your academic journey</p>
                </div>

                {/* Email Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                  </div>

                  <motion.a
                    href="mailto:support@yourinstitution.edu"
                    className="inline-block text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    support@campussync.com
                  </motion.a>

                  <p className="text-gray-600 text-sm mt-3">
                    We typically respond within 24 hours during business days
                  </p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/60 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-semibold text-gray-800">Response Time</span>
                    </div>
                    <p className="text-gray-600 text-sm">Within 24 hours</p>
                  </div>

                  <div className="bg-white/60 rounded-lg p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z"
                        />
                      </svg>
                      <span className="font-semibold text-gray-800">Support Hours</span>
                    </div>
                    <p className="text-gray-600 text-sm">Mon-Fri, 9AM-5PM</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-green-800">Need Immediate Help?</h3>
              </div>
              <p className="text-green-700 text-sm">
                For urgent technical issues or account problems, please include your student/faculty ID and a detailed
                description of the issue in your email for faster assistance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-500 text-sm">
            Thank you for using our educational platform. We're committed to providing you with the best support
            possible.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
