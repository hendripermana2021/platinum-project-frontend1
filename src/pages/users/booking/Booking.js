import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Action from "../../../components/actions/ActionButton";
import Footer from "../../../components/footer/Footer";

import jwt_decode from "jwt-decode";

import "./booking.css";

const Booking = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  // const idBooking = sessionStorage.getItem("idBooking");

  const [bookingData, setBookingData] = useState({
    firstTicket: "",
    secondTicket: "",
    passengerData: "",
    flightData: "",
    successBooking: "",
  });

  const [userLogin, setUserLogin] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    decoder();
  });

  const decoder = () => {
    try {
      if (!accessToken) {
        navigate("/404");
      } else {
        const decode = jwt_decode(accessToken);
        setUserLogin({
          userId: decode.userId,
          firstname: decode.firstname,
          lastname: decode.lastname,
          email: decode.email,
          phone: decode.phone,
          gender: decode.gender,
        });
        setBookingData({
          firstTicket: JSON.parse(sessionStorage.getItem("firstTicket")),
          secondTicket: JSON.parse(sessionStorage.getItem("secondTicket")),
          flightData: JSON.parse(sessionStorage.getItem("flightData")),
          passengerData: JSON.parse(sessionStorage.getItem("passengerData")),
          successBooking: JSON.parse(sessionStorage.getItem("successBooking")),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="booking-page">
      <Navbar />
      <Action data={bookingData} user={userLogin} />
      <Footer />
    </div>
  );
};

export default Booking;
