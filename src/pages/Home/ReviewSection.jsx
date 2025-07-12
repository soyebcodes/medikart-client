import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Alice M.",
    rating: 5,
    comment:
      "This medicine worked perfectly for me. Quick relief and no side effects!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Bob J.",
    rating: 4,
    comment:
      "Good quality and reasonable price. I would recommend it to others.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Catherine S.",
    rating: 3,
    comment:
      "It helped a bit but took longer than I expected. Might try something else next time.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function StarRating({ rating }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewSection() {
  return (
    <section className="py-16   ">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold mb-8 text-green-600 dark:text-green-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Customer Reviews
        </motion.h2>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {reviews.map(({ id, name, rating, comment, avatar }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="p-6 rounded-lg shadow-md  dark:bg-gray-800 text-left"
            >
              <StarRating rating={rating} />
              <p className="mt-4 text-gray-700 dark:text-gray-200 italic">
                &ldquo;{comment}&rdquo;
              </p>
              <div className="flex items-center mt-6">
                <img
                  src={avatar}
                  alt={name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  loading="lazy"
                />
                <p className="font-semibold text-gray-900 dark:text-white">
                  {name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
