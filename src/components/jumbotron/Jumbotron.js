import React from "react";
import "./jumbotron.css";

// Import image
import Plane from "../../assets/landing/pesawat.svg";

const Jumbotron = () => {
  return (
    <section id="home">
      <div className="jumbotron background-image">
        <img src={Plane} alt="flit" width="100%" />
        <p className="text-center">Easy Way to FLight</p>
      </div>
    </section>
  );
};
export default Jumbotron;
