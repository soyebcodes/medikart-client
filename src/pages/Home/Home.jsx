import React from "react";
import HeroSlider from "./HeroSlider";
import CategoryCardSection from "./Category/CategoryCard";
import DiscountProducts from "./DiscountProducts";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <CategoryCardSection />
      <DiscountProducts />
    </div>
  );
};

export default Home;
