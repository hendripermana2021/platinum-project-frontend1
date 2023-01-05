import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../../server";

import Navbar from "../../components/navbar/Navbar";
import Jumbotron from "../../components/jumbotron/Jumbotron";
import Panel from "../../components/panel/Panel";
import Promotion from "../../components/promotion/Promotion";
import OurService from "../../components/services/Services";
import WhyUs from "../../components/whyus/whyUs";
import Testimonial from "../../components/testimonial/Testimonial.js";
import Footer from "../../components/footer/Footer";

const Landing = () => {
  const [airport, setAirport] = useState("");

  useEffect(() => {
    getAirport();
  }, []);
  const getAirport = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/airports`);
      setAirport(get.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Panel data={airport} />
      <Promotion />
      <OurService />
      <WhyUs />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Landing;
