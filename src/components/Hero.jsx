import { motion } from "framer-motion";
import { FaSignInAlt, FaBookOpen } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 to-purple-50 overflow-hidden py-28">
 
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>

      <div className="container mx-auto px-6 lg:px-20 flex flex-col items-center text-center gap-8">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight"
        >
          Revolutionize Corporate Asset Management
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-black dark:text-gray-300 text-lg md:text-xl max-w-3xl"
        >
          Track, assign, and manage company assets efficiently. Reduce losses, streamline processes, and empower your team—all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <a
            href="/join-hr"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <FaSignInAlt /> Get Started
          </a>

          <a
            href="/learn-more"
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FaBookOpen /> Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
