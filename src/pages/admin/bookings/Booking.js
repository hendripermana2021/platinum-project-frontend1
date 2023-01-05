import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";

import "./booking.css";
import axios from "axios";
import server from "../../../server";
const Booking = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState("");

  useEffect(() => {
    decoder();
    isAdmin();
    booking();
  }, []);

  const booking = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/userbookings`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBookings(get.data.data);
      console.log(bookings);
    } catch (error) {
      console.log(error.message);
    }
  };

  const decoder = () => {
    try {
      if (!accessToken) {
        navigate("/404");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isAdmin = () => {
    const decode = jwt_decode(accessToken);

    if (decode.role_id !== 1) return navigate("/404");
    setName(decode.firstname + " " + decode.lastname);
  };
  // Currency IDR Formatter
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="bookingAdmin">
      <Sidebar />
      <div className="bookingAdminContainer">
        <Navbar name={name} />
        <div className="content container">
          <h2 className="mt-3">All Data of User doing Booking</h2>
          <div className="row">
            {Object.values(bookings).map((data, index) => (
              <div className="col-md-4 my-2" key={index}>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item>
                    <Accordion.Header className="text-center">
                      Booking ID : {data.booking_id}
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="ms-2">
                        {data.users === null ? (
                          <p>Name : null</p>
                        ) : (
                          <p>
                            Name :{" "}
                            {data.users.firstname + " " + data.users.lastname}
                          </p>
                        )}
                        <p>Total Passenger : {data.booking.totalPassanger}</p>
                      </div>
                      <div className="border-top p-2">
                        <span className="span-kecil">
                          Departure Ticket Information
                        </span>
                        <p>
                          flight_id : {data.booking.ticketDeparture === null ? "":data.booking.ticketDeparture.flight_id}
                        </p>
                        <p>
                          Price :{" "}
                          {data.booking.ticketDeparture === null ? "":formatter.format(data.booking.ticketDeparture.price)}
                        </p>
                        <span className="span-kecil">
                          Return Ticket Information
                        </span>
                        {data.booking.ticketReturn === null ? (
                          <p>Return Ticket : null</p>
                        ) : (
                          <>
                            <p>
                              flight_id :{" "}
                              {data.booking.ticketDeparture === null ? "":data.booking.ticketDeparture.flight_id}
                            </p>
                            <p>
                              Price :{" "}
                              {data.booking.ticketDeparture === null ? "":formatter.format(
                                data.booking.ticketDeparture.price
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
