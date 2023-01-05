import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from "../../../components/footer/Footer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

//images
import Note from "../../../assets/dashboard/Vector.svg";

import server from "../../../server";

import "./wishlist.css";
const Wishtlist = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [wishlist, setWishlist] = useState("");

  const [err, setErr] = useState("");
  const [ticket, setTicket] = useState({
    ticket_id_departure: "",
    ticket_id_return: "",
  });

  useEffect(() => {
    decoder();
    getWishList();
  });
  const decoder = async () => {
    try {
      if (!accessToken) {
        navigate("/404");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getWishList = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/wishlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setWishlist(get.data.data);
    } catch (error) {
      console.log(error.message);
      setWishlist("");
    }
  };
  const deleteWishlist = async (id) => {
    try {
      const del = await axios.delete(
        `${server}/v1/api/wishlists/delete/${id}`,
        {
          ticket_id_departure: parseInt(ticket.ticket_id_departure),
          ticket_id_return: ticket.ticket_id_return,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setErr(del.data.msg);
      setShow(true);
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      setShow(true);
    }
  };
  // Currency IDR Formatter
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  // For Alert Show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErr("");
  };

  return (
    <div>
      <Navbar />
      <div className="container rounded bg-white my-5">
        <div className="row justify-content-center">
          <Sidebar />

          <div className="col-lg-7 border-right">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 class=" heading-line">
                <b>
                  Wishlist <i class="fa fa-heart text-muted"></i>
                </b>
              </h4>
            </div>
            <div className="row">
              <div className="col-md-12">
                {wishlist !== "" ? (
                  Object.values(wishlist).map((data, index) => (
                    <div className="wishlist mt-2" key={index}>
                      <div className="row py-3 container-wishlist">
                        <div className="col-md-12">
                          <p>
                            Destination :
                            {data.ticketDeparture === null  ? (
                              ""
                            ) : (
                              <b>
                                {" " +
                                  data.ticketDeparture.flight.DepartureTerminal
                                    .code +
                                  " To " +
                                  data.ticketDeparture.flight.ArrivalTerminal
                                    .code}
                              </b>
                            )}
                          </p>
                          <p>
                            Date :
                            {data.ticketDeparture === null ? (
                              ""
                            ) : (
                              <b>
                                {" " +
                                  data.ticketDeparture.flight.departureDate.slice(
                                    0,
                                    10
                                  )}
                              </b>
                            )}
                          </p>
                          <p>
                            Price :
                            <b>
                              { data.ticketDeparture === null ? "": " " +
                                formatter.format(data.ticketDeparture.price)}
                            </b>
                          </p>
                        </div>
                        <div className="d-grid">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => {
                              setTicket({
                                ticket_id_departure: data.ticketDeparture.id,
                                ticket_id_return: data.ticketReturn,
                              });
                              deleteWishlist(data.id);
                            }}
                          >
                            Delete Wishlist
                          </button>
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
                          <b>There's nothing any wishlists</b>
                        </p>
                        <p
                          className="teks-white"
                          style={{ fontSize: "13px", textAlign: "justify" }}
                        >
                          Seluruh wishlist anda akan muncul di sini, tapi kini
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
      {err === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {err === "Delete Wishlist Successfully" ? "Great" : "Sorry"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {err === "Delete Wishlist Successfully" ? (
              <div className="text-success d-flex align-items-center">
                <i className="bi bi-check-all"></i>
                <div className="ps-3">{err}</div>
              </div>
            ) : (
              <div className="text-danger d-flex align-items-center">
                <i className="bi bi-exclamation-circle"></i>
                <div className="ps-3">{err}</div>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {err === "You Must Sign In before continue" ? (
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/auth");
                }}
              >
                Sign In
              </Button>
            ) : (
              ""
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Wishtlist;
