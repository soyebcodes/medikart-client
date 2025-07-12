import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules"; // Removed Navigation, Scrollbar
import "swiper/css";
import "swiper/css/pagination";

const DiscountProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://medikart-server-pjna.onrender.com/api/medicines/discounts/all"
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load discounted products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (products.length === 0)
    return (
      <p className="text-center text-gray-500">No discounted products found.</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Discounted Products
      </h2>

      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-10"
      >
        {products.map((product) => {
          const discountAmount =
            (product.pricePerUnit * product.discountPercentage) / 100;
          const discountedPrice = product.pricePerUnit - discountAmount;

          return (
            <SwiperSlide key={product._id}>
              <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg">
                <figure className="h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/default-product.png"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>

                  <div className="mt-2">
                    <span className="text-xl font-semibold text-green-600">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="ml-2 line-through text-gray-400">
                      ${product.pricePerUnit.toFixed(2)}
                    </span>
                  </div>

                  <div className="badge badge-secondary mt-2 mb-4">
                    {product.discountPercentage}% OFF
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DiscountProducts;
