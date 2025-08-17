import React from "react";

const NewsLetter = () => {
  return (
    <section class="py-12 bg-gray-100 dark:bg-gray-800">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
          Stay Updated
        </h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Subscribe to get the latest offers and health tips.
        </p>

        <form class="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
          />
          <button
            type="submit"
            class="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
