import React from "react";
import HeroSlider from "./HeroSlider";
import CategoryCardSection from "./Category/CategoryCard";
import DiscountProducts from "./DiscountProducts";
import NewArrivals from "./NewArrivals";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <CategoryCardSection />
      <DiscountProducts />
      <NewArrivals />
    </div>
  );
};

export default Home;
