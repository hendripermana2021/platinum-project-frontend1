import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "../../../../components/admin/navbar/Navbar";
import Sidebar from "../../../../components/admin/sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import axios from "axios";
import server from "../../../../server";
const Update = () => {
  const navigate = useNavigate();
  const { airportId } = useParams();
  const accessToken = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");

  const [err, setErr] = useState("");

  //airport states
  const [airName, setAirName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [terminal, setTerminal] = useState("");

  // For Alert Show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErr("");
  };

  useEffect(() => {
    isLogin();
    isAdmin();
  });
  useEffect(() => {
    getAirport();
  }, []);

  const getAirport = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/airports/${airportId}`);
      setAirName(get.data.data.name);
      setCode(get.data.data.code);
      setCity(get.data.data.city);
      setCountry(get.data.data.country);
      setTerminal(get.data.data.terminal);
    } catch (error) {
      console.log(error.message);
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
    if (airName === "") {
      setErr("Please fill the Airport Name");
      return setShow(true);
    }
    if (code === "") {
      setErr("Please fill the Code Name");
      return setShow(true);
    }
    if (city === "") {
      setErr("Please fill the City Name");
      return setShow(true);
    }
    if (country === "") {
      setErr("Please fill the Country Name");
      return setShow(true);
    }
    if (terminal === "") {
      setErr("Please fill the Terminal Name");
      return setShow(true);
    }
    try {
      const post = await axios.put(
        `${server}/v1/api/airports/edit/${airportId}`,
        {
          name: airName,
          code,
          city,
          country,
          terminal,
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
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar name={name} />
        <div className="airportContent">
          <h2 className="mt-3">Update New Airport Data</h2>
          <div className="newFlightContent">
            <form onSubmit={submitHandler} className="form-new-flight">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={airName}
                      onChange={(e) => {
                        setAirName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="code" className="form-label">
                      Code
                    </label>
                    <input
                      type="text"
                      id="code"
                      className="form-control"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
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
                    <label htmlFor="terminal" className="form-label">
                      Terminal
                    </label>
                    <input
                      type="text"
                      id="terminal"
                      className="form-control"
                      value={terminal}
                      onChange={(e) => {
                        setTerminal(e.target.value);
                      }}
                    />
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
              {err === "Airport Success Updated" ? "Great" : "Sorry"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {err === "Airport Success Updated" ? (
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
            {err === "Airport Success Updated" ? (
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/admin/airports");
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
