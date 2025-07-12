import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/advertised/slider")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Failed to load slider ads:", err));
  }, []);

  if (slides.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-base-200">
        <p className="text-lg text-gray-500">
          No featured products at the moment.
        </p>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      className="w-full h-64 md:h-96"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide._id}>
          <div
            className="w-full h-64 md:h-96 bg-cover bg-center rounded-lg shadow-lg relative"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 rounded p-4 max-w-xs">
              <h2 className="text-white text-xl font-bold">
                {slide.medicineName || "Medicine"}
              </h2>
              <p className="text-white text-sm">{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
