import React from "react";
import "./whyus.css";
const whyUs = () => {
  return (
    <div>
      <section id="why-us">
        <div className="container pb-4 px-4">
          <div className="row text-center d-block pt-5 pb-md-4">
            <h1 className="my-3">Why choose us</h1>
            <p>
              House is commited to helping its clients to reach their goals.
            </p>
          </div>
          <div className="row py-5 choose">
            <div className="col-md-3 p-4">
              <img
                src="https://api.elements.buildwithangga.com/storage/files/2/assets/Content/Content-House/taxes.svg"
                alt="taxes"
                className="img-fluid"
              />
              <p className="font-weight-bold mt-4 mb-1 cl-blue">
                Tax Advantage
              </p>
              <p className="mb-0">
                Tax advantage which applies to certain accounts or investments.
              </p>
            </div>
            <div className="col-md-3 p-4">
              <img
                src="https://api.elements.buildwithangga.com/storage/files/2/assets/Content/Content-House/user.svg"
                alt="user"
                className="img-fluid"
              />
              <p className="font-weight-bold mt-4 mb-1 cl-blue">
                Property Insurance
              </p>
              <p className="mb-0">
                A series of policies that offer either property protection of
                liability coverage.
              </p>
            </div>
            <div className="col-md-3 p-4">
              <img
                src="https://api.elements.buildwithangga.com/storage/files/2/assets/Content/Content-House/discount.svg"
                alt="discount"
                className="img-fluid"
              />
              <p className="font-weight-bold mt-4 mb-1 cl-blue">
                Lowest Commision
              </p>
              <p className="mb-0">
                No longer have to negatiate commissions and haggle with other
                agents.
              </p>
            </div>
            <div
              className="col-md-3 p-4"
              onmouseover="coloringgoals(this)"
              onmouseout="normalgoals(this)"
            >
              <img
                src="https://api.elements.buildwithangga.com/storage/files/2/assets/Content/Content-House/calendar.svg"
                alt="calendar"
                className="img-fluid"
              />
              <p className="font-weight-bold mt-4 mb-1 cl-blue">House Now</p>
              <p className="mb-0">
                Easy booking system for a host. Try our innovative model.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default whyUs;
