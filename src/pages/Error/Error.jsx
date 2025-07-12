import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-xl text-center space-y-8">
        <motion.h1
          className="text-[120px] font-extrabold text-[#008236] leading-none"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Sorry, the page you were looking for doesn’t exist or has been moved.
          Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2 border-2 border-[#008236] text-[#008236] hover:bg-[#008236] hover:text-white transition rounded-full font-semibold"
          >
            <FaArrowAltCircleLeft size={18} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ErrorPage;
