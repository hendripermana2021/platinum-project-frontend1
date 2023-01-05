import React, { useState } from "react";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import server from "../../server";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./login.css";

// import image
import loginText from "../../assets/login/Tagline Login.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${server}/v1/api/login`, {
        email: email,
        password: password,
      });
      const token = post.data.accessToken;
      sessionStorage.setItem("accessToken", token);
      const decoded = jwt_decode(token);

      if (parseInt(decoded.role_id) === 1) {
        navigate("/admin");
      } else {
        navigate("/users");
      }
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
      <div className="container mt-5">
        <div className="row row-cols-md-12 row-cols-1 d-flex justify-content-center align-items-center hero mb-5">
          <form
            onSubmit={Login}
            className="form-input justify-content-center align-items-center mb-5"
          >
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="row align-items-center">
                <div className="tagline">
                  <img src={loginText} alt="" class="hero-headline" />
                </div>
              </div>
            </div>
            {msg === null ? (
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
            <div className="row align-items-start">
              <div className="flex-column align-items-center mb-2">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="example100@gmail.com"
                  id="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="flex-column align-items-start">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{ marginTop: "-20px" }}
              >
                <div className="flex-column align-items-center">
                  <a href="/reg">
                    <span className="mt-4 pt-4 d-flex ini-span text-center">
                      <p style={{ color: "#2663FF" }}>Don't</p>&nbsp;
                      <p style={{ color: "#BABABA" }}>Have Account?</p>
                    </span>
                  </a>
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
                      marginTop: " -15px",
                    }}
                  >
                    <p>Let's Go</p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
