import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

import server from "../../../server";

import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./flight.css";
const Flight = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");
  const [flights, setFlights] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    isLogin();
    isAdmin();
  });
  useEffect(() => {
    getFlights();
  }, []);

  // For Alert Show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErr("");
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
  const getFlights = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/flight`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setFlights(get.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const del = await axios.delete(`${server}/v1/api/flight/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setErr(del.data.msg);
      setShow(true);
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      setShow(true);
    }
  };
  console.log(flights)
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar name={name} />
        <div className="contentFlight container">
          <h2 className="mt-3">Flight Data</h2>

          <div className="d-grid col-3 p-3">
            <Link
              to={"/admin/newflight"}
              role={"button"}
              className="btn btn-outline-primary"
            >
              {" "}
              Add New Flight
            </Link>
          </div>
          <div className="row">
            {Object.values(flights).map((data, index) => (
              <div className="col-md-4" key={index}>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item>
                    <Accordion.Header>
                      {" "}
                      <p>
                        Flight ID : <b>{data.id}</b>
                      </p>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p className="flightInformation text-muted">
                        Flight Information
                      </p>
                      <div className="list-flight">
                        <p>
                          Departure Date : <b>{data.departureDate}</b>
                        </p>
                        <p>
                          Departure Time : <b>{data.departureTime}</b>
                        </p>
                        <p>
                          Arrival Date : <b>{data.arrivalDate}</b>
                        </p>
                        <p>
                          Arrival Time : <b>{data.arrivalTime}</b>
                        </p>
                      </div>
                      <hr />
                      <p className="flightInformation text-muted">
                        Departure Information
                      </p>
                      {
                        data.DepartureTerminal === null ? "":(<div className="list-flight">
                        <p>
                          Terminal Name : <b>{data.DepartureTerminal.name}</b>
                        </p>
                        <p>
                          Terminal Code : <b>{data.DepartureTerminal.code}</b>
                        </p>
                        <p>
                          Terminal City : <b>{data.DepartureTerminal.city}</b>
                        </p>
                        <p>
                          Terminal Country :{" "}
                          <b>{data.DepartureTerminal.country}</b>
                        </p>
                      </div>)
                      }
                      
                      <hr />{" "}
                      {
                        data.ArrivalTerminal === null ? "":(<div className="list-flight">
                        <p className="flightInformation text-muted">
                          Arrival Information
                        </p>
                        <p>
                          Terminal Name : <b>{data.ArrivalTerminal.name}</b>
                        </p>
                        <p>
                          Terminal Code : <b>{data.ArrivalTerminal.code}</b>
                        </p>
                        <p>
                          Terminal City : <b>{data.ArrivalTerminal.city}</b>
                        </p>
                        <p>
                          Terminal Country :{" "}
                          <b>{data.ArrivalTerminal.country}</b>
                        </p>
                      </div>)
                      }
                      
                      <div className="row">
                        <div className="col-md-6 d-grid">
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              deleteHandler(data.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        <div className="col-md-6 d-grid">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              navigate(`/admin/flights/${data.id}`);
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
      {err === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>
              {err === "Added Flight Successfully" ? "Great" : "Sorry"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {err === "Added Flight Successfully" ? (
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
            {err === "Delete Flight Successfully" ? (
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

export default Flight;
