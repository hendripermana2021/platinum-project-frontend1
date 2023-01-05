import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// import images
import girl from "../../assets/landing/Group 1342.png";
import person from "../../assets/landing/Group 1345.png";

import "./testimonial.css";
const Testimonial = () => {
  return (
    <div>
      <section className="testimonial" id="testimonial">
        <div class="content-3-1 container-xxl mx-auto position-relative">
          <div class="d-flex flex-lg-row flex-column align-items-center">
            <div class="img-hero text-center justify-content-center d-flex">
              <img id="hero" class="img-fluid" src={girl} alt="" />
            </div>

            <div class="right-column d-flex flex-column align-items-lg-start align-items-center text-lg-start text-center">
              <p
                className="p-biru"
                style={{
                  color: "blue",
                }}
              >
                {" "}
                What They Say
              </p>
              <h2 class="title-text">What Our Customer Say About Us</h2>
              <OwlCarousel
                className="owl-theme "
                loop
                items={1}
                autoplay
                nav
                dots
              >
                <div className="item testimonial-carousel">
                  <p>
                    "Saat yang tepat dari penghargaan tertinggi yang diberikan
                    Flit Airlines untuk membernya untuk menikmati layanan yang
                    perfect untuk member dalam pelayanan sebelum terbang. Flit
                    Airlines terus terdepan.”
                  </p>
                  <div className="details">
                    <img
                      src={person}
                      alt="testimonial person"
                      className="testimonial-img"
                    />
                    <span class="name">Citra Meii</span>&nbsp;&nbsp;
                    <span class="job">• Backpackers</span>
                  </div>
                </div>
                <div className="item testimonial-carousel">
                  <p>
                    "Saat yang tepat dari penghargaan tertinggi yang diberikan
                    Flit Airlines untuk membernya untuk menikmati layanan yang
                    perfect untuk member dalam pelayanan sebelum terbang. Flit
                    Airlines terus terdepan.”
                  </p>
                  <div className="details">
                    <img
                      src={person}
                      alt="testimonial person"
                      className="testimonial-img"
                    />
                    <span class="name">Firman</span>&nbsp;&nbsp;
                    <span class="job">• Backpackers</span>
                  </div>
                </div>
                <div className="item testimonial-carousel">
                  <p>
                    "Saat yang tepat dari penghargaan tertinggi yang diberikan
                    Flit Airlines untuk membernya untuk menikmati layanan yang
                    perfect untuk member dalam pelayanan sebelum terbang. Flit
                    Airlines terus terdepan.”
                  </p>
                  <div className="details">
                    <img
                      src={person}
                      alt="testimonial person"
                      className="testimonial-img"
                    />
                    <span class="name">Novi Amanda</span>&nbsp;&nbsp;
                    <span class="job">• Backpackers</span>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
