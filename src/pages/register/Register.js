import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import server from "../../server";
import "./register.css";

// import image
import loginText from "../../assets/login/Tagline Login.svg";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    birthdate: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [msg, setMsg] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const success = "OK";

  const handleClose = () => setShow(false);

  const changeHandler = (event) => {
    const { name, value, type, checked } = event.target; //event target destructuring

    setFormData((prevFormData) => {
      //set State Value
      return {
        ...prevFormData, //take prev state to new object
        [name]: type === "checkbox" ? checked : value, // if type is checkbox the value will be checked (bolean value) else the value willl be value of input
      };
    });
  };
  const Register = async (e) => {
    e.preventDefault();

    const isNumber = isFinite(formData.phone);

    if (isNumber === false) {
      setMsg("Phone must be fill number");
      return setShow(true);
    }
    if (parseInt(formData.birthdate.slice(0, 4)) >= 2012) {
      setMsg("You must be 10 or older");
      return setShow(true);
    }

    try {
      await axios.post(`${server}/v1/api/register`, {
        firstname: formData.firstName,
        lastname: formData.lastName,
        phone: formData.phone,
        birthdate: formData.birthdate,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        confPassword: formData.confPassword,
      });
      setMsg(success);
      navigate("/auth");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        setShow(true);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 register">
        <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero mb-5">
          <form
            onSubmit={Register}
            class="form-input justify-content-center align-items-center mb-5"
          >
            {" "}
            <div className="d-flex flex-column align-items-center">
              <div className="row align-items-center">
                <div className="tagline">
                  <img src={loginText} alt="" class="hero-headline" />
                </div>
              </div>
            </div>
            {msg === null || msg === success ? (
              ""
            ) : (
              <Modal show={show}>
                <Modal.Header>
                  <Modal.Title>Sorry</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <div className="text-danger d-flex align-items-center">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <div className="ps-3">{msg}</div>
                  </div>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            <div
              className="row align-items-start"
              style={{ marginTop: "-25px" }}
            >
              <div className="flex-column align-items-start">
                <label for="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="firstname"
                  placeholder="First Name"
                  id="firstname"
                  className="form-control"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex-column align-items-start">
                <label for="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="lastname"
                  placeholder="Last Name"
                  id="lastname"
                  className="form-control"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="row align-items-start">
              <div className="col">
                <label for="flexRadioDefault1" className="form-label">
                  Jenis Kelamin
                </label>
                <div class="form-check mt-2">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault1"
                    value="laki-laki"
                    checked={formData.gender === "laki-laki"}
                    onChange={changeHandler}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Laki - Laki
                  </label>
                  <div class="form-check form-check-inline ms-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gender"
                      id="inlineRadio1"
                      value="perempuan"
                      checked={formData.gender === "perempuan"}
                      onChange={changeHandler}
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      Perempuan
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-start">
              <div className="col-lg-6">
                <label for="exampleInputEmail1" className="form-label">
                  Mobile Number
                </label>
                <input
                  type="nohp"
                  placeholder="08xxxxxxxxx"
                  id="Username"
                  className="form-control"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={changeHandler}
                />
              </div>
              <div className="col-lg-6">
                <label for="exampleInputEmail1" className="form-label">
                  Birth Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="mm/dd/yyyy"
                  id="password"
                  required
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="row align-items-start">
              <div className="flex-column align-items-start">
                <label for="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example100@gmail.com"
                  id="Username"
                  className="form-control"
                  required
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                />
              </div>
              <div className="flex-column align-items-start">
                <label for="exampleInputEmail1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="password"
                  aria-label="Password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={changeHandler}
                />
              </div>
              <div className="col">
                <label for="exampleInputEmail1" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  id="password"
                  required
                  name="confPassword"
                  value={formData.confPassword}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <div className="flex-column align-items-center">
                <button
                  className="btn btn-primary ini-button"
                  type="submit"
                  style={{
                    background: "#2663FF",
                    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
                    borderRadius: "30px",
                    width: "194.35px",
                    height: "42px",
                    marginTop: " 45px",
                  }}
                >
                  <p>Let's Go</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
