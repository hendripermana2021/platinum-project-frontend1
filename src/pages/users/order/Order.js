import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//components
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from "../../../components/footer/Footer";

//image
import Note from "../../../assets/dashboard/Vector.svg";

import server from "../../../server";
import "./order.css";

const Order = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");

  const [order, setOrder] = useState("");

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
    } catch (error) {
      console.log(error.message);
      setOrder("");
    }
  };

  const payHandler = (id) => {
    navigate(`/users/payment/${id}`);
  };

  // Currency IDR Formatter
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div>
      <Navbar />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row justify-content-center">
          <Sidebar />

          <div className="col-lg-7 border-right">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 class=" heading-line">
                <b>
                  My Order <i class="fa fa-sticky-note text-muted"></i>
                </b>
              </h4>
            </div>
            <div className="pemesanan">
              <div className="part3-booking-hdr">
                <div className="prt-hdr">
                  <div className="desc-tiket">
                    <p>
                      Temukan e-ticket Anda di{" "}
                      <p style={{ color: "blue" }}>
                        <a href="/users" style={{ textDecoration: "none" }}>
                          {" "}
                          Disini{" "}
                        </a>
                      </p>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mt-4 mb-3 header-booking">
                  <b>Menunggu Pembayaran</b>
                </div>
                {order !== "" ? (
                  Object.values(order).map((data, index) => (
                    <div className="col-md-12 mb-4" key={index}>
                      <div className="bdr-pesanan">
                        <div className="row nomine-bill px-3">
                          <div className="col-md col-sm-12 name-hdr mt-3">
                            No. Pesanan {data.id}
                          </div>
                          <div
                            className="col-md col-sm-12 mt-3 price"
                            style={{ justifyContent: "right" }}
                          >
                            <p>
                              Total Price :{" "}
                              <b>{formatter.format(data.totalPrice)}</b>{" "}
                            </p>
                          </div>
                        </div>
                        <hr />
                        {data.usersPayment.booking.ticket_id_return === "" ||
                        data.usersPayment.booking.ticket_id_return === null ? (
                          <h6 className="px-3">One Trip</h6>
                        ) : (
                          <h6 className="px-3">Round Trip</h6>
                        )}
                        <div className="row px-3">
                          <div className="col-md-6">
                            <p className="text-muted">First Ticket</p>
                            <p>
                              Departure Terminal :{" "}
                              {
                                data.usersPayment.booking.ticketDeparture.flight
                                  .DepartureTerminal.code
                              }
                            </p>
                            <p>
                              Country :{" "}
                              {
                                data.usersPayment.booking.ticketDeparture.flight
                                  .DepartureTerminal.country
                              }
                            </p>
                            <p>
                              Departure Date / Time :{" "}
                              {data.usersPayment.booking.ticketDeparture.flight.departureDate.slice(
                                0,
                                10
                              ) +
                                " / " +
                                data.usersPayment.booking.ticketDeparture.flight
                                  .departureTime}
                            </p>
                            <p>
                              Arrival Date / Time :{" "}
                              {data.usersPayment.booking.ticketDeparture.flight.arrivalDate.slice(
                                0,
                                10
                              ) +
                                " / " +
                                data.usersPayment.booking.ticketDeparture.flight
                                  .arrivalTime}
                            </p>
                          </div>
                          {data.usersPayment.booking.ticket_id_return === "" ||
                          data.usersPayment.booking.ticket_id_return ===
                            null ? (
                            ""
                          ) : data.usersPayment.booking.ticketReturn ===
                            null ? (
                            ""
                          ) : (
                            <div className="col-md-6">
                              <p className="text-muted">Second Ticket</p>
                              <p>
                                Departure Terminal :{" "}
                                {
                                  data.usersPayment.booking.ticketReturn.flight
                                    .DepartureTerminal.code
                                }
                              </p>
                              <p>
                                Country :{" "}
                                {
                                  data.usersPayment.booking.ticketReturn.flight
                                    .DepartureTerminal.country
                                }
                              </p>
                              <p>
                                Departure Date / Time :{" "}
                                {data.usersPayment.booking.ticketReturn.flight.departureDate.slice(
                                  0,
                                  10
                                ) +
                                  " / " +
                                  data.usersPayment.booking.ticketReturn.flight
                                    .departureTime}
                              </p>
                              <p>
                                Arrival Date / Time :{" "}
                                {data.usersPayment.booking.ticketReturn.flight.arrivalDate.slice(
                                  0,
                                  10
                                ) +
                                  " / " +
                                  data.usersPayment.booking.ticketReturn.flight
                                    .arrivalTime}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="row">
                          <div className="col-md d-grid justify-content-start ms-3 mb-3">
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                payHandler(data.id);
                              }}
                            >
                              Pay Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    <div className="col container-booking-white">
                      <img
                        src={Note}
                        alt="note-pict"
                        width={65}
                        style={{
                          marginLeft: "35px",
                        }}
                      />
                      <div
                        className="teks-white"
                        style={{
                          marginLeft: "50px",
                          marginTop: "20px",
                        }}
                      >
                        <p className="teks-white">
                          <b>Belum Ada Pesanan</b>
                        </p>
                        <p
                          className="teks-white"
                          style={{ fontSize: "13px", textAlign: "justify" }}
                        >
                          Seluruh pesanan anda akan muncul di sini, tapi kinni
                          anda belum punya satu pun. <br />
                          Mari buat pesanan{" "}
                          <a href="/users" style={{ textDecoration: "none" }}>
                            disini
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Order;
