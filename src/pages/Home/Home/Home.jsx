import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import TopCategories from "../TopCategories/TopCategories";
import Testimonials from "../Testimonials/Testimonials";
import AvailableStudySessions from "../StudySessions/AvailableStudySessions";
import SalesPromotion from "../SalesPromotion/SalesPromotion";
import Newsletter from "../Newsletter/Newsletter";

const Home = () => {
  return (
    <>
      <Banner />
      <AvailableStudySessions />
      <HowItWorks />
      <TopCategories />
      <SalesPromotion />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
