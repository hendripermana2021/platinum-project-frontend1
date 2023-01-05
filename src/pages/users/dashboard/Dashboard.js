import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../../server";

import Navbar from "../../../components/navbar/Navbar";
import Jumbotron from "../../../components/jumbotron/Jumbotron";
import Panel from "../../../components/panel/Panel";
import Promotion from "../../../components/promotion/Promotion";
import OurService from "../../../components/services/Services";
import WhyUs from "../../../components/whyus/whyUs";
import Testimonial from "../../../components/testimonial/Testimonial";
import Footer from "../../../components/footer/Footer";

const Dashboard = () => {
  const [airport, setAirport] = useState("");
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    decoder();
  });

  useEffect(() => {
    getAirport();
  }, []);

  const decoder = () => {
    try {
      if (!accessToken) {
        navigate("/404");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
      <Panel data={airport} token={accessToken} />
      <Promotion />
      <OurService />
      <WhyUs />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Dashboard;
