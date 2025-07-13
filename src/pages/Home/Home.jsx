import React from "react";
import HeroSlider from "./HeroSlider";
import DiscountProducts from "./DiscountProducts";
import NewArrivals from "./NewArrivals";
import ReviewSection from "./ReviewSection";
import { Suspense } from "react";
import CategoryCardSection from "./Category/CategoryCardSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MediKart | Home</title>
        <meta
          name="description"
          content="Buy genuine medicines from multiple vendors at MediKart."
        />
      </Helmet>

      <Suspense
        fallback={
          <div className="loading loading-spinner loading-lg text-primary"></div>
        }
      >
        <HeroSlider />
      </Suspense>

      <Suspense
        fallback={
          <div className="loading loading-spinner loading-lg text-primary"></div>
        }
      >
        <CategoryCardSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="loading loading-spinner loading-lg text-primary"></div>
        }
      >
        <DiscountProducts />
      </Suspense>

      <Suspense
        fallback={
          <div className="loading loading-spinner loading-lg text-primary"></div>
        }
      >
        <NewArrivals />
      </Suspense>
      <ReviewSection />
    </div>
  );
};

export default Home;
