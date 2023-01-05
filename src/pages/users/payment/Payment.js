import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../../../server";

//components
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";

import "./payment.css";
import Sidebar from "../../../components/sidebar/Sidebar";
const Payment = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [order, setOrder] = useState("");
  const payment = [];

  useEffect(() => {
    decoder();
    getOrder();
  });
  const decoder = () => {
    try {
      if (!accessToken) {
        navigate("/404");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOrder = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/payments`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setOrder(get.data.data);
      getPaymentById(order);
    } catch (error) {
      console.log(error.message);
      setOrder("");
    }
  };
  const getPaymentById = (order) => {};
  console.log({ payment, order, paymentId });
  return (
    <div>
      <Navbar />
      <div className="container rounded my-5">
        <div className="row justify-content-center">
          <Sidebar />

          <div className="col-lg-7">
            <div className="card-payment col-sm-12">
              <h1>Bill Details</h1>
              <hr />
              <p>Name</p>
              <p>Phone</p>
              <p>Total Price</p>
            </div>
            <div className="card-payment col-sm-12">
              <h1>Ticket Order Confirmation</h1>
              <hr />
              <div>
                <div className="row">
                  <div className="ticket-detail-payment">
                    <div className="card-payment-detail">
                      <div className="row nomine-bill">
                        &nbsp;&nbsp;
                        <div className="col-4 col-sm-12 name-hdr mt-3">
                          No. Pesanan
                        </div>
                        <div
                          className="col-3 col-sm-12 mt-3 price"
                          style={{ justifyContent: "right" }}
                        >
                          <b>Harga Tiket</b>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 col-sm-12 air-goals">
                          <div>
                            <p>Palembang to Jakarta</p>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-12 air-goals">
                          &nbsp;&nbsp;
                          <img src="./assets/dashboard/asuransi.svg" alt="" />
                          <p>Asuransi Perjalanan (Penerbangan)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-6">
                <div className="d-grid">
                  <button className="btn btn-danger">Cancel</button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-grid">
                  <button className="btn btn-success">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
