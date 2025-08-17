import React from "react";

const WhyChoseUs = () => {
  return (
    <section class="py-12 bg-gray-50 dark:bg-gray-900 max-w-7xl mx-auto rounded-2xl">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
          Why Choose Us
        </h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Trusted by thousands of customers for safe and genuine medicines
        </p>
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <div class="text-indigo-600 dark:text-indigo-400 text-4xl mb-3">
              ✅
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Genuine Medicines
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
              100% verified medicines from trusted sellers.
            </p>
          </div>

          <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <div class="text-indigo-600 dark:text-indigo-400 text-4xl mb-3">
              🚚
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Fast Delivery
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Quick and reliable delivery across all cities.
            </p>
          </div>

          <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <div class="text-indigo-600 dark:text-indigo-400 text-4xl mb-3">
              🔒
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Secure Payments
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Pay easily with Stripe, completely secure.
            </p>
          </div>

          <div class="p-6 rounded-2xl shadow-md bg-white dark:bg-gray-800">
            <div class="text-indigo-600 dark:text-indigo-400 text-4xl mb-3">
              📞
            </div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
              24/7 Support
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Our team is always available to help you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoseUs;
