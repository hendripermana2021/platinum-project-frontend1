import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import server from "../../../../server";

import Navbar from "../../../../components/admin/navbar/Navbar";
import Sidebar from "../../../../components/admin/sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Update = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const { flightId } = useParams();
  const [name, setName] = useState("");
  const [airports, setAirports] = useState("");
  const [err, setErr] = useState("");

  // For Alert Show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErr("");
  };

  //flight states
  const [depAir, setDepAir] = useState("");
  const [depDate, setDepDate] = useState("");
  const [depTime, setDepTime] = useState("");
  const [arrAir, setArrAir] = useState("");
  const [arrDate, setArrDate] = useState("");
  const [arrTime, setArrTime] = useState("");
  const [seat, setSeat] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [flightType, setFlightType] = useState("");
  const [plane, setPlane] = useState("");

  useEffect(() => {
    isLogin();
    isAdmin();
    getAirport();
  });
  useEffect(() => {
    getFlight();
  }, []);

  const getFlight = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/flight/byid/${flightId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setDepAir(get.data.departureAirport);
      setArrAir(get.data.arrivalAirport);
      setArrDate(get.data.arrivalDate);
      setDepTime(get.data.departureTime);
      setArrTime(get.data.arrivalTime);
      setFlightType(get.data.flightType);
      setPlane(get.data.planeId);
      setSeat(get.data.ticket.class_id);
      setPrice(get.data.ticket.price);
      setCountry(get.data.ticket.country);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAirport = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/airports`);
      setAirports(get.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const isLogin = () => {
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
  const submitHandler = async (e) => {
    e.preventDefault();

    if (depAir === "") {
      setErr("Please fill the departure airport");
      return setShow(true);
    }
    if (depDate === "") {
      setErr("Please fill the departure date");
      return setShow(true);
    }
    if (depTime === "") {
      setErr("Please fill the departure time");
      return setShow(true);
    }
    if (arrAir === "") {
      setErr("Please fill the arrival airport");
      return setShow(true);
    }
    if (arrDate === "") {
      setErr("Please fill the arrival date");
      return setShow(true);
    }
    if (arrTime === "") {
      setErr("Please fill the arrival time");
      return setShow(true);
    }
    if (seat === "") {
      setErr("Please fill the seat class");
      return setShow(true);
    }
    if (price === "") {
      setErr("Please fill the price");
      return setShow(true);
    }
    if (country === "") {
      setErr("Please fill the country");
      return setShow(true);
    }
    if (flightType === "") {
      setErr("Please fill the flight type");
      return setShow(true);
    }
    if (plane === "") {
      setErr("Please fill the plane type");
      return setShow(true);
    }
    try {
      const put = await axios.put(
        `${server}/v1/api/flight/edit/${flightId}`,
        {
          flight: {
            departureAirport: parseInt(depAir),
            arrivalAirport: parseInt(arrAir),
            departureDate: depDate,
            arrivalDate: arrDate,
            departureTime: depTime,
            arrivalTime: arrTime,
            flightType: parseInt(flightType),
            planeId: parseInt(plane),
          },
          ticket: {
            class_id: parseInt(seat),
            price: parseInt(price),
            country: country,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setErr(put.data.msg);
      setShow(true);
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      setShow(true);
    }
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar name={name} />
        <div className="contentFlight container ">
          <h2>Update New Flight Data</h2>
          <div className="newFlightContent">
            <form onSubmit={submitHandler} className="form-new-flight">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="DepAir" className="form-label">
                      Departure Airport
                    </label>
                    <select
                      id="DepAirt"
                      className="form-select"
                      value={depAir}
                      onChange={(e) => {
                        setDepAir(e.target.value);
                      }}
                    >
                      {Object.values(airports).map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.city} ({data.code}), {data.country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="DepDate" className="form-label">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      id="DepDate"
                      className="form-control"
                      value={depDate}
                      onChange={(e) => {
                        setDepDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="DepTime" className="form-label">
                      Departure Time
                    </label>
                    <select
                      id="DepTime"
                      className="form-select"
                      onChange={(e) => {
                        setDepTime(e.target.value);
                      }}
                      value={depTime}
                    >
                      <option value="06:41:44">06:41:44</option>
                      <option value="08:11:00">08:11:00</option>
                      <option value="09:32:24">09:32:24</option>
                      <option value="11:01:23">11:01:23</option>
                      <option value="13:21:03">13:21:03</option>
                      <option value="16:14:03">16:14:03</option>
                      <option value="18:06:03">18:06:03</option>
                      <option value="20:16:03">20:16:03</option>
                      <option value="22:53:13">22:53:13</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="ArrAir" className="form-label">
                      Arrival Airport
                    </label>
                    <select
                      id="ArrAir"
                      className="form-select"
                      value={arrAir}
                      onChange={(e) => {
                        setArrAir(e.target.value);
                      }}
                    >
                      {Object.values(airports).map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.city} ({data.code}), {data.country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="ArrDate" className="form-label">
                      Arrival Date
                    </label>
                    <input
                      type="date"
                      id="ArrDate"
                      className="form-control"
                      value={arrDate}
                      onChange={(e) => {
                        setArrDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="ArrTime" className="form-label">
                      Arrival Time
                    </label>
                    <select
                      id="ArrTime"
                      className="form-select"
                      value={arrTime}
                      onChange={(e) => {
                        setArrTime(e.target.value);
                      }}
                    >
                      <option value="06:41:44">06:41:44</option>
                      <option value="08:11:00">08:11:00</option>
                      <option value="09:32:24">09:32:24</option>
                      <option value="11:01:23">11:01:23</option>
                      <option value="13:21:03">13:21:03</option>
                      <option value="16:14:03">16:14:03</option>
                      <option value="18:06:03">18:06:03</option>
                      <option value="20:16:03">20:16:03</option>
                      <option value="22:53:13">22:53:13</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="seat" className="form-label">
                      Seat Class
                    </label>
                    <select
                      id="seat"
                      className="form-select"
                      value={seat}
                      onChange={(e) => {
                        setSeat(e.target.value);
                      }}
                    >
                      <option value="1">Bussiness</option>
                      <option value="2">Economy</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      id="price"
                      className="form-control"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="form-control"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="type" className="form-label">
                      Flight Type
                    </label>
                    <select
                      id="type"
                      className="form-select"
                      value={flightType}
                      onChange={(e) => {
                        setFlightType(e.target.value);
                      }}
                    >
                      <option value="1">One Trip</option>
                      <option value="2">Round Trip</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="plane" className="form-label">
                      Plane
                    </label>
                    <select
                      id="plane"
                      className="form-select"
                      value={plane}
                      onChange={(e) => {
                        setPlane(e.target.value);
                      }}
                    >
                      <option value="1">ABX Air</option>
                      <option value="3">Air Adriatic</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <button className="btn btn-success">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {err === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {err === "Flight Success Updated" ? "Great" : "Sorry"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {err === "Flight Success Updated" ? (
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
            {err === "Flight Success Updated" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/admin/flights");
                }}
              >
                Close
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Update;
