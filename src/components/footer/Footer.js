import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="container-md d-flex flex-column flex-lg-row justify-content-between mt-3 mb-3 footer-container pt-5">
        <div className="address footer-child col-auto" style={{ width: 350 }}>
          <img src="./assets/landing/flit-2 1.svg" alt="" width={35} />
          <img src="./assets/landing/flit-3 1.svg" alt="" width={35} />

          <p className="brand-tagline">
            We kaboom your beauty holiday instantly and memorable.
          </p>
        </div>
        <div className="col-auto mr-5">
          <p className="header-ftr">For Beginner</p>
          <div className="footer-child">
            <p>
              <a href="/regist">New Account</a>
            </p>
            <p>
              <a href="/login">Start Booking</a>
            </p>
          </div>
        </div>
        <div className="col-auto mr-5 navigation">
          <p className="header-ftr">Explore Us</p>
          <div className="footer-child">
            <p>
              <a href="#home">Home</a>
            </p>
            <p>
              <a href="#promotion">Promotion</a>
            </p>
            <p>
              <a href="#our-service">Our Services</a>
            </p>
            <p>
              <a href="#testimonial">Testimonial</a>
            </p>
          </div>
        </div>
        <div className="col-auto mr-5 contact">
          <p className="header-ftr">Connect Us</p>
          <div className="footer-child">
            <p>supportflit@airlines.com</p>
            <p>+627654654</p>
            <p>Jakarta, ID</p>
          </div>
        </div>
      </div>
      <p
        className="info-footercopyrigth text-center pb-3"
        style={{ color: " #575964" }}
      >
        Copyright 2022 • All rights reserved • Flit
      </p>
    </footer>
  );
};

export default Footer;
