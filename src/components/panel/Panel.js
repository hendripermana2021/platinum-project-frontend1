import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import server from "../../server";

import "./panel.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// import image
import plane from "../../assets/landing/panel-plane.svg";

const Panel = (props) => {
  const airports = props.data;
  const navigate = useNavigate();

  const [btnView, setBtnView] = useState(false);
  const [dari, setDari] = useState("");
  const [ke, setKe] = useState("");
  const [pergi, setPergi] = useState("");
  const [pulang, setPulang] = useState("");
  const [count, setCount] = useState("");

  // For Passenger
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [idType, setIdType] = useState("ktp");
  const [idNumber, setIdNumber] = useState("");
  const [savePassenger, setSavePassenger] = useState([]);

  // For Error Messages
  const [err, setErr] = useState(null);

  // For Flight Information
  const [flightResult, setFlightResult] = useState({
    roundTrip: {
      firstTrip: "",
      secondTrip: "",
    },
    oneTrip: "",
  });

  const [firstTicket, setFirstTicket] = useState({
    ticket_id: "",
    departureAirport: "",
    arrivalAirport: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    price: "",
    class: "",
  });
  const [secondTicket, setSecondTicket] = useState({
    ticket_id: "",
    departureAirport: "",
    arrivalAirport: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    price: "",
    class: "",
  });

  // For Alert Show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErr("");
  };

  // Currency IDR Formatter
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // Handler Function
  const roundTripHandler = async (e) => {
    e.preventDefault();
    console.log({ dari, ke, pergi, pulang, count });

    if (dari === "") {
      setErr("Please fill the departure airport");
      return setShow(true);
    }
    if (ke === "") {
      setErr("Please fill the arrival airport");
      return setShow(true);
    }
    if (pergi === "") {
      setErr("Please fill the departure date");
      return setShow(true);
    }
    if (pulang === "") {
      setErr("Please fill the arrival date");
      return setShow(true);
    }
    if (count === "") {
      setErr("Please input the passengers");
      return setShow(true);
    }
    try {
      const get = await axios.get(
        `${server}/v1/api/tickets/search?departure=${dari}&arrival=${ke}&datedeparture=${pergi}`
      );
      const secondGet = await axios.get(
        `${server}/v1/api/tickets/search?departure=${ke}&arrival=${dari}&datedeparture=${pulang}`
      );
      setFlightResult({
        roundTrip: {
          firstTrip: get.data.data,
          secondTrip: secondGet.data.data,
        },
        oneTrip: undefined,
      });
      console.log({
        firstlink: `${server}/v1/api/tickets/search?departure=${dari}&arrival=${ke}&datedeparture=${pergi}`,
        secondlink: `${server}/v1/api/tickets/search?departure=${ke}&arrival=${dari}&datedeparture=${pulang}`,
      });
    } catch (error) {
      console.log(error.message);
      setErr("Data Not Found");
      return setShow(true);
    }
  };
  const oneTripHandler = async (e) => {
    e.preventDefault();
    console.log({ dari, ke, pergi });

    if (dari === "") {
      setErr("Please fill the departure airport");
      return setShow(true);
    }
    if (ke === "") {
      setErr("Please fill the arrival airport");
      return setShow(true);
    }
    if (pergi === "") {
      setErr("Please fill the departure date");
      return setShow(true);
    }
    if (count === "") {
      setErr("Please input the passengers");
      return setShow(true);
    }

    try {
      const get = await axios.get(
        `${server}/v1/api/tickets/search?departure=${dari}&arrival=${ke}&datedeparture=${pergi}`
      );

      setFlightResult({
        roundTrip: {
          firstTrip: undefined,
          secondTrip: undefined,
        },
        oneTrip: get.data.data,
      });
    } catch (error) {
      console.log(error.message);
      setErr("Data Not Found");
      return setShow(true);
    }
  };

  const saveHandler = () => {
    // get accessToken
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      setErr("You Must Sign In before continue");
      return setShow(true);
    }

    if (firstname === "") {
      setErr("Please fill the First Name before save");
      return setShow(true);
    }
    if (lastname === "") {
      setErr("Please fill the Last Name before save");
      return setShow(true);
    }
    if (email === "") {
      setErr("Please fill the Email before save");
      return setShow(true);
    }
    if (savePassenger.length >= count) {
      setErr(`You Only fill the Passenger Identity for ${count} times`);
      return setShow(true);
    } else {
      setSavePassenger([
        ...savePassenger,
        { firstname, lastname, email, age, idType, idNumber },
      ]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setAge("");
      setIdType("");
      setIdNumber("");
    }
  };

  const bookHandler = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      await axios.post(
        `${server}/v1/api/booking`,
        {
          ticket: {
            ticket_id_departure: firstTicket.ticket_id,
            ticket_id_return: secondTicket.ticket_id,
            totalPrice:
              parseInt(firstTicket.price) +
              parseInt(secondTicket.price) * count,
          },
          passanger: savePassenger,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      sessionStorage.setItem("firstTicket", JSON.stringify(firstTicket));
      sessionStorage.setItem("secondTicket", JSON.stringify(secondTicket));
      sessionStorage.setItem("passengerData", JSON.stringify(savePassenger));
      sessionStorage.setItem(
        "flightData",
        JSON.stringify({ firstTicket, secondTicket })
      );
      navigate("/users/booking");
    } catch (error) {
      console.log(error.message);
      setErr("Server is busy");
      return setShow(true);
    }
  };
  const bookHandlerOneTrip = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const post = await axios.post(
        `${server}/v1/api/booking`,
        {
          ticket: {
            ticket_id_departure: firstTicket.ticket_id,
            totalPrice: (firstTicket.price + secondTicket.price) * count,
          },
          passanger: savePassenger,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(post.data.data);
      sessionStorage.setItem("firstTicket", JSON.stringify(firstTicket));
      sessionStorage.setItem("secondTicket", JSON.stringify(secondTicket));
      sessionStorage.setItem("passengerData", JSON.stringify(savePassenger));
      sessionStorage.setItem("flightData", JSON.stringify(firstTicket));
      sessionStorage.setItem("successBooking", JSON.stringify(post.data.data));
      navigate("/users/booking");
    } catch (error) {
      console.log(error.message);
      setErr("Server is busy");
      return setShow(true);
    }
  };

  const addWishlistHandler = async (ticketId) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      setErr("You Must Sign In before continue");
      return setShow(true);
    }

    try {
      const post = await axios.post(
        `${server}/v1/api/wishlists/create`,
        {
          ticket_id_departure: parseInt(ticketId),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setErr(post.data.msg);
      setShow(true);
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      setShow(true);
    }
  };

  // clg for debug

  return (
    <section className="mb-5" id="search-panel">
      <div className="container search-panel">
        <div className="row" style={{ borderRadius: "20px" }}>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-1 plane-panel">
                <img src={plane} alt="plane panel" />
                <p>Penerbangan</p>
              </div>
              <div className="col-md-11">
                <div className="row">
                  <div className="col-md">
                    <div className="row button-view">
                      <button
                        onClick={(e) => setBtnView(false)}
                        className={
                          "col-md btn-view btn-left btn " +
                          (btnView === false ? "bg-primary" : "")
                        }
                      >
                        Round Trip
                      </button>
                      <button
                        onClick={(e) => setBtnView(true)}
                        className={
                          "col-md btn-view point-panel-view-top-right btn " +
                          (btnView === true ? "bg-primary" : "")
                        }
                      >
                        One Trip
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md panel-view point-panel-view-bottom-right">
                    {btnView === false ? (
                      <div className="container py-3">
                        <form onSubmit={roundTripHandler} className="row ">
                          <div className="row mb-3">
                            <div className="col-md">
                              <label htmlFor="dari">Departure Airport</label>
                              <select
                                id="dari"
                                className="form-select"
                                value={dari}
                                onChange={(e) => {
                                  setDari(e.target.value);
                                }}
                              >
                                {Object.values(airports).map((data, index) => (
                                  <option key={index} value={data.code}>
                                    {data.city} ({data.code}), {data.country}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md sm-sm">
                              <label htmlFor="ke">Arrival Airport</label>
                              <select
                                id="ke"
                                className="form-select"
                                value={ke}
                                onChange={(e) => {
                                  setKe(e.target.value);
                                }}
                              >
                                {Object.values(airports).map((data, index) => (
                                  <option key={index} value={data.code}>
                                    {data.city} ({data.code}), {data.country}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md ">
                              <label htmlFor="pergi">Departure Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Pergi"
                                id="pergi"
                                value={pergi}
                                onChange={(e) => {
                                  setPergi(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-md sm-sm">
                              <label htmlFor="pulang">
                                Round Departure Date
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Pulang"
                                id="pulang"
                                value={pulang}
                                onChange={(e) => {
                                  setPulang(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-md sm-sm">
                              <label htmlFor="passenger">Passenger</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Passenger"
                                id="passenger"
                                value={count}
                                onChange={(e) => {
                                  setCount(parseInt(e.target.value));
                                }}
                                min={1}
                                max={6}
                              />
                            </div>
                            <div className="col-md d-grid">
                              <button className="btn btn-primary mt-4">
                                Get The Flight
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="container py-3">
                        <form onSubmit={oneTripHandler}>
                          <div className="row mb-3">
                            <div className="col-md">
                              <label htmlFor="dari">Departure Airport</label>
                              <select
                                id="dari"
                                className="form-select"
                                value={dari}
                                onChange={(e) => {
                                  setDari(e.target.value);
                                }}
                              >
                                {Object.values(airports).map((data, index) => (
                                  <option key={index} value={data.code}>
                                    {data.city} ({data.code})
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md sm-sm">
                              <label htmlFor="ke">Arrival Airport</label>
                              <select
                                id="ke"
                                className="form-select"
                                value={ke}
                                onChange={(e) => {
                                  setKe(e.target.value);
                                }}
                              >
                                {Object.values(airports).map((data, index) => (
                                  <option key={index} value={data.code}>
                                    {data.city} ({data.code})
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-md">
                              <label htmlFor="pergi">Departure Date</label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="Pergi"
                                id="pergi"
                                value={pergi}
                                onChange={(e) => {
                                  setPergi(e.target.value);
                                }}
                              />
                            </div>
                            <div className="col-md sm-sm">
                              <label htmlFor="passenger">Passenger</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Passenger"
                                id="passenger"
                                value={count}
                                onChange={(e) => {
                                  setCount(parseInt(e.target.value));
                                }}
                                min={1}
                                max={6}
                              />
                            </div>
                            <div className="col-md d-grid">
                              <button className="btn btn-primary mt-4">
                                Get The Flight
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {/* Flight Result */}
        {flightResult.oneTrip === undefined &&
        flightResult.roundTrip.firstTrip !== "" ? (
          <div className="row row-sm">
            <div className="col-md-5 col-sm-5">
              <div className="container card">
                <div className="card-header">
                  <h1>Ticket Information</h1>
                </div>

                <div className="mb-3">
                  <h3 className="text-center my-3">Round Trip Ticket</h3>
                  <div className="border mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <p className="p-3">
                          {firstTicket.departureAirport}{" "}
                          {firstTicket.departureAirport !== "" ? " -> " : ""}
                          {firstTicket.arrivalAirport}
                        </p>
                      </div>
                      <div className="col-md-6">
                        {firstTicket.price !== "" ? (
                          <div className="p-3">
                            <p>Harga Tiket</p>
                            <p>
                              {formatter.format(parseInt(firstTicket.price))}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <p className="p-3">
                          {secondTicket.departureAirport}{" "}
                          {secondTicket.departureAirport !== "" ? " -> " : ""}
                          {secondTicket.arrivalAirport}
                        </p>
                      </div>
                      <div className="col-md-6">
                        {secondTicket.price !== "" ? (
                          <div className="p-3">
                            <p>Harga Tiket</p>
                            <p>
                              {formatter.format(parseInt(secondTicket.price))}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 border-top">
                    <div className="col-md mt-2">
                      <p className="fw-bold">Total</p>
                    </div>
                    <div className="col-md mt-2">
                      <p className="fw-bold">
                        {formatter.format(
                          parseInt(firstTicket.price) +
                            parseInt(secondTicket.price) * count
                        )}
                      </p>
                    </div>
                  </div>

                  {count <= savePassenger.length ? (
                    <div className="d-grid mt-3">
                      <button className="btn btn-success" onClick={bookHandler}>
                        Book Ticket
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row">
                {firstTicket.ticket_id === "" ? (
                  Object.values(flightResult.roundTrip.firstTrip).map(
                    (data, index) => (
                      <div className="col-md-12 mb-3" key={index}>
                        <div className="row card mx-1">
                          <div className="col-md">
                            <div className="card-header">
                              <h2 className="text-center">
                                {data.flight.DepartureTerminal.code} to{" "}
                                {data.flight.ArrivalTerminal.code}
                              </h2>
                              <p className="text-center">
                                {data.flight.DepartureTerminal.country} -{" "}
                                {data.flight.ArrivalTerminal.country}
                              </p>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="card-body text-center">
                              <div className="row">
                                <div className="col-md">
                                  <p>Tanggal Tiba : </p>
                                  <p>
                                    {data.flight.departureTime.slice(0, 5)} -{" "}
                                    {data.flight.arrivalTime.slice(0, 5)}
                                  </p>
                                </div>
                                <div className="col-md pt-4">
                                  <p>
                                    {formatter.format(parseInt(data.price))}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="row">
                              <div className="col-md-6">
                                <div class="d-grid">
                                  <button
                                    class="btn btn-outline-primary"
                                    type="button"
                                    onClick={() => {
                                      setFirstTicket({
                                        ticket_id: data.id,
                                        departureAirport:
                                          data.flight.DepartureTerminal.code,
                                        arrivalAirport:
                                          data.flight.ArrivalTerminal.code,
                                        departureDate:
                                          data.flight.departureDate,
                                        departureTime:
                                          data.flight.departureTime,
                                        arrivalDate: data.flight.arrivalDate,
                                        arrivalTime: data.flight.arrivalTime,
                                        price: data.price,
                                        class: data.class.type,
                                      });
                                    }}
                                    style={{ marginTop: "15px" }}
                                  >
                                    Book Now
                                  </button>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-grid">
                                  <button
                                    className="btn btn-outline-danger mt-3"
                                    onClick={() => {
                                      addWishlistHandler(data.id);
                                    }}
                                  >
                                    Add To Wishlist
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : secondTicket.ticket_id === "" ? (
                  Object.values(flightResult.roundTrip.secondTrip).map(
                    (data, index) => (
                      <div className="col-md-12 mb-3" key={index}>
                        <div className="row card mx-1">
                          <div className="col-md">
                            <div className="card-header">
                              <h2 className="text-center">
                                {data.flight.DepartureTerminal.code} to{" "}
                                {data.flight.ArrivalTerminal.code}
                              </h2>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="card-body text-center">
                              <div className="row">
                                <div className="col-md">
                                  <p>Tanggal Tiba : </p>
                                  <p>
                                    {data.flight.departureTime.slice(0, 5)} -{" "}
                                    {data.flight.arrivalTime.slice(0, 5)}
                                  </p>
                                </div>
                                <div className="col-md pt-4">
                                  <p>
                                    {formatter.format(parseInt(data.price))}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md">
                            <div className="row">
                              <div className="col-md-6">
                                <div class="d-grid">
                                  <button
                                    class="btn btn-primary"
                                    type="button"
                                    onClick={() => {
                                      setSecondTicket({
                                        ticket_id: data.id,
                                        departureAirport:
                                          data.flight.DepartureTerminal.code,
                                        arrivalAirport:
                                          data.flight.ArrivalTerminal.code,
                                        departureDate:
                                          data.flight.departureDate,
                                        departureTime:
                                          data.flight.departureTime,
                                        arrivalDate: data.flight.arrivalDate,
                                        arrivalTime: data.flight.arrivalTime,
                                        price: data.price,
                                        class: data.class.type,
                                      });
                                    }}
                                    style={{ marginTop: "15px" }}
                                  >
                                    Book Now
                                  </button>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-grid">
                                  <button
                                    className="btn btn-outline-danger mt-3"
                                    onClick={() => {
                                      addWishlistHandler(data.id);
                                    }}
                                  >
                                    Add To Wishlist
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : count !== "" ? (
                  <div>
                    <div className="col-md mb-3">
                      <div className="container card">
                        <div className="card-header text-center">
                          <h2>Passenger Identity</h2>
                        </div>
                        <div className="card-body border-bottom">
                          <p className="text-center text-muted">
                            {savePassenger.length} Passenger Identity Added
                          </p>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="firstname">
                                First Name
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                id="firstname"
                                className="form-control"
                                value={firstname}
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="lastname">
                                Last Name
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                id="lastname"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => {
                                  setLastName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="email">
                                Email
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="age">
                                Age
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="number"
                                id="age"
                                className="form-control"
                                value={age}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="idtype">
                                Identity Type
                              </label>
                            </div>
                            <div className="col-md-8">
                              <select
                                className="form-select"
                                id="idtype"
                                value={idType}
                                onChange={(e) => {
                                  setIdType(e.target.value);
                                }}
                              >
                                <option value="ktp">KTP</option>
                                <option value="sim">SIM</option>
                              </select>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="idnumber">
                                ID Number
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                id="idnumber"
                                className="form-control"
                                value={idNumber}
                                onChange={(e) => {
                                  setIdNumber(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-grid card-footer">
                          <button
                            className="btn btn-primary"
                            onClick={saveHandler}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : flightResult.roundTrip.firstTrip === undefined &&
          flightResult.oneTrip !== "" ? (
          <div className="row row-sm">
            <div className="col-md-5 col-sm-5">
              <div className="container card">
                <div className="card-header">
                  <h1>Ticket Information</h1>
                </div>
                <div className="card-body mb-3">
                  <h3 className="text-center">One Trip Ticket</h3>
                  <div className="container card mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            {firstTicket.departureAirport}{" "}
                            {firstTicket.departureAirport !== "" ? " -> " : ""}
                            {firstTicket.arrivalAirport}
                          </p>
                        </div>
                        <div className="col-md-6">
                          {firstTicket.price !== "" ? (
                            <div>
                              <p>Harga Tiket</p>
                              <p>
                                {formatter.format(parseInt(firstTicket.price))}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2 border-top">
                    <div className="col-md mt-2">
                      <p className="fw-bold">Total</p>
                    </div>
                    <div className="col-md mt-2">
                      <p className="fw-bold">
                        {formatter.format(parseInt(firstTicket.price) * count)}
                      </p>
                    </div>
                  </div>
                  {count <= savePassenger.length ? (
                    <div className="d-grid mt-3">
                      <button
                        className="btn btn-success"
                        onClick={bookHandlerOneTrip}
                      >
                        Book Ticket
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row">
                {firstTicket.ticket_id === "" ? (
                  Object.values(flightResult.oneTrip).map((data, index) => (
                    <div className="col-md-12 mb-3" key={index}>
                      <div className="row card mx-1">
                        <div className="col-md">
                          <div className="card-header">
                            <h2 className="text-center">
                              {data.flight.DepartureTerminal.code} to{" "}
                              {data.flight.ArrivalTerminal.code}
                            </h2>
                            <p className="text-center">
                              {data.flight.DepartureTerminal.country} -{" "}
                              {data.flight.ArrivalTerminal.country}
                            </p>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="card-body text-center">
                            <div className="row">
                              <div className="col-md">
                                <p>Tanggal Tiba : </p>
                                <p>
                                  {data.flight.departureTime.slice(0, 5)} -{" "}
                                  {data.flight.arrivalTime.slice(0, 5)}
                                </p>
                              </div>
                              <div className="col-md pt-4">
                                <p>{formatter.format(parseInt(data.price))}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md">
                          <div className="row">
                            <div className="col-md-6">
                              <div class="d-grid">
                                <button
                                  class="btn btn-outline-primary"
                                  type="button"
                                  onClick={() => {
                                    setFirstTicket({
                                      ticket_id: data.id,
                                      departureAirport:
                                        data.flight.DepartureTerminal.code,
                                      arrivalAirport:
                                        data.flight.ArrivalTerminal.code,
                                      departureDate: data.flight.departureDate,
                                      departureTime: data.flight.departureTime,
                                      arrivalDate: data.flight.arrivalDate,
                                      arrivalTime: data.flight.arrivalTime,
                                      price: data.price,
                                      class: data.class.type,
                                    });
                                  }}
                                  style={{ marginTop: "15px" }}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="d-grid">
                                <button
                                  className="btn btn-outline-danger mt-3"
                                  onClick={() => {
                                    addWishlistHandler(data.id);
                                  }}
                                >
                                  Add To Wishlist
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : count !== "" ? (
                  <div>
                    <div className="col-md mb-3">
                      <div className="container card">
                        <div className="card-header text-center">
                          <h2>Passenger Identity</h2>
                        </div>
                        <div className="card-body border-bottom">
                          <p className="text-center text-muted">
                            {savePassenger.length} Passenger Identity Added
                          </p>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="firstname">
                                First Name
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                id="firstname"
                                className="form-control"
                                value={firstname}
                                onChange={(e) => {
                                  setFirstName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="lastname">
                                Last Name
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                id="lastname"
                                className="form-control"
                                value={lastname}
                                onChange={(e) => {
                                  setLastName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="email">
                                Email
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="age">
                                Age
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="number"
                                id="age"
                                className="form-control"
                                value={age}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="idtype">
                                Identity Type
                              </label>
                            </div>
                            <div className="col-md-8">
                              <select
                                className="form-select"
                                id="idtype"
                                value={idType}
                                onChange={(e) => {
                                  setIdType(e.target.value);
                                }}
                              >
                                <option value="ktp">KTP</option>
                                <option value="sim">SIM</option>
                              </select>
                            </div>
                          </div>
                          <div className="row mb-2">
                            <div className="col-md-4">
                              <label className="py-2" htmlFor="idnumber">
                                ID Number
                              </label>
                            </div>
                            <div className="col-md-8">
                              <input
                                type="text"
                                id="idnumber"
                                className="form-control"
                                value={idNumber}
                                onChange={(e) => {
                                  setIdNumber(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-grid card-footer">
                          <button
                            className="btn btn-primary"
                            onClick={saveHandler}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {err === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {err === "Wishlist added" ? "Great" : "Sorry"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {err === "Wishlist added" ? (
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
    </section>
  );
};

export default Panel;
