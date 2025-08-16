import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("https://medikart-server-pjna.onrender.com/api/advertised/slider")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Failed to load slider ads:", err));
  }, []);

  return (
    <div className="hero-slider w-full max-w-7xl mx-auto px-4 py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        className="w-full rounded-lg shadow-lg"
      >
        {slides.map(({ _id, imageUrl, medicineName }) => (
          <SwiperSlide key={_id} className="h-full relative">
            <img
              src={imageUrl}
              alt={medicineName || "Featured medicine"}
              className="hero-slide w-full h-full object-cover rounded-lg"
              loading="lazy"
            />

            {/* <div className="absolute top-1/2 left-6 md:left-12 transform -translate-y-1/2 max-w-md text-white drop-shadow-md">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {medicineName || "Your Trusted Pharmacy"}
            </h1>
            <p className="text-md md:text-lg mt-2 max-w-sm">
              {description ||
                "Quality medicines delivered to your doorstep, fast and safe."}
            </p>
            <button
              onClick={() => alert(`Shop ${medicineName || "now"}`)}
              className="mt-4 bg-teal-500 hover:bg-teal-600 transition-colors duration-300 text-white px-6 py-2 rounded shadow-md font-semibold"
            >
              Shop Now
            </button>
          </div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
