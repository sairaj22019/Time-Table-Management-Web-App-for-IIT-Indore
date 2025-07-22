"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function NotFound() {
  console.log("404 page")
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="shadow-xl border-0 bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden max-w-2xl mx-auto">
              <div className="p-8 sm:p-12">
                {/* 404 Illustration */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8"
                >
                  <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64">
                    {/* Background circles */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-20"></div>
                    <div className="absolute inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30"></div>
                    <div className="absolute inset-8 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full opacity-40"></div>

                    {/* 404 Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.4 }}
                        className="text-6xl sm:text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        404
                      </motion.div>
                    </div>

                    {/* Floating elements */}
                    <motion.div
                      className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute -bottom-2 -left-6 w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
                      animate={{ y: [10, -10, 10] }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute top-1/4 -left-8 w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full"
                      animate={{ x: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                    />
                  </div>
                </motion.div>

                {/* Error Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-4 mb-8"
                >
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    The page you are looking for seems to have wandered off into the digital void. Do not worry, even the
                    best students sometimes take a wrong turn!
                  </p>
                </motion.div>

                {/* Helpful Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Here is what you can try:
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Check if the URL is spelled correctly</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Go back to the previous page and try again</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Return to the homepage and navigate from there</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Contact support if you believe this is an error 
                      </span>
                    </li>
                  </ul>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <motion.button
                    onClick={handleGoHome}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Go to Homepage
                  </motion.button>

                  <motion.button
                    onClick={handleGoBack}
                    className="px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Go Back
                  </motion.button>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="mt-8 pt-6 border-t border-gray-200"
                >
                  <p className="text-gray-500 text-sm">
                    Still having trouble? Contact our support team at{" "}
                    <a
                      href="mailto:support@yourinstitution.edu"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      support@campussync.com
                    </a>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Fun Stats Section */}
        

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="text-center mt-8 pb-8"
        >
          <p className="text-gray-400 text-xs">Error 404 - This page could not be found on our educational platform</p>
        </motion.div>
      </div>
    </main>
  )
}

