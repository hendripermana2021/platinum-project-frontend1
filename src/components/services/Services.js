import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./services.css";

// import images
import s1 from "../../assets/landing/service 1.png";
import s2 from "../../assets/landing/service 2.png";
import s3 from "../../assets/landing/Frame 5.png";
const Service = () => {
  return (
    <div>
      <section id="our-service" className="mt-4">
        <div className="desc-slides">
          <h1>Our Service</h1>
        </div>
        <div className="container">
          <OwlCarousel className="owl-theme" loop margin={10} autoplay nav dots>
            <div className="item">
              <img src={s1} alt="" />
            </div>
            <div className="item">
              <img src={s2} alt="" />
            </div>
            <div className="item">
              <img src={s3} alt="" />
            </div>
          </OwlCarousel>
        </div>
      </section>
    </div>
  );
};

export default Service;
