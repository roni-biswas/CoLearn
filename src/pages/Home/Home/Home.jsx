import React from "react";
import Banner from "../Banner/Banner";
import StudySessions from "../StudySessions/StudySessions";
import HowItWorks from "../HowItWorks/HowItWorks";
import TopCategories from "../TopCategories/TopCategories";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Banner />
      <StudySessions />
      <HowItWorks />
      <TopCategories />
      <Testimonials />
    </>
  );
};

export default Home;
