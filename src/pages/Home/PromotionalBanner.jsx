import React from "react";

const PromotionalBanner = () => {
  return (
    <section class="py-10 bg-emerald-500 dark:bg-emerald-600">
  <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
    
    <!-- Text -->
    <div>
      <h2 class="text-3xl font-bold text-white">💊 Your Health, Our Priority</h2>
      <p class="mt-2 text-white/90">Get <span class="font-semibold">20% off</span> your first order of genuine medicines.</p>
    </div>

    <!-- CTA Button -->
    <a href="/shop" 
       class="mt-6 md:mt-0 inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition">
      Shop Now
    </a>
  </div>
</section>

  );
};

export default PromotionalBanner;
