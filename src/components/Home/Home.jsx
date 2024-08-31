import React from "react";
import { useContext } from "react";
// import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItworks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompnies";
// import HeroSection from "./HeroSection";
// // import HowItWorks from "./HowItWorks";
// import PopularCategories from "./PopularCategories";
// import PopularCompanies from "./PopularCompanies";
// import HowItWorks from "./HowItworks";

const Home = () => {
//   const { isAuthorized } = useContext(Context);
//   if (!isAuthorized) {
//     return <Navigate to={"/login"} />;
//   }
  return (
    <>
      <section className="homePage page">
        {/* <HeroSection /> */}
        <HeroSection/>
        {/* <HowItWorks /> */}
        <HowItWorks/>
        {/* <PopularCategories /> */}
        <PopularCategories/>
        {/* <PopularCompanies /> */}
        <PopularCompanies/>
      </section>
    </>
  );
};

export default Home;