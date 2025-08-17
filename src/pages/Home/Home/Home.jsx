import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import TopCategories from "../TopCategories/TopCategories";
import Testimonials from "../Testimonials/Testimonials";
import AvailableStudySessions from "../StudySessions/AvailableStudySessions";
import SalesPromotion from "../SalesPromotion/SalesPromotion";

const Home = () => {
  return (
    <>
      <Banner />
      <AvailableStudySessions />
      <HowItWorks />
      <TopCategories />
      <Testimonials />
      <SalesPromotion />
    </>
  );
};

export default Home;
