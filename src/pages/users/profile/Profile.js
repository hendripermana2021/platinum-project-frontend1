import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// components
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from "../../../components/footer/Footer";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import server from "../../../server";

import "./profile.css";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  // For Alert Show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErr("");
  };

  useEffect(() => {
    decoder();
  }, []);

  const decoder = () => {
    try {
      if (!accessToken) {
        navigate("/404");
      } else {
        const decode = jwt_decode(accessToken);

        setFirstName(decode.firstname);
        setLastName(decode.lastname);
        setEmail(decode.email);
        setPhone(decode.phone);
        setBirthDate(decode.birthDate);
        setPreview(decode.pictures);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  const saveHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${server}/v1/api/users/profile`,
        {
          email,
          firstname: firstName,
          lastname: lastName,
          phone,
          birthdate: birthDate,
          homeAddress: address,
          country,
          province,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const post = await axios.post(
        `${server}/v1/api/upload`,
        {
          file,
        },
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      setMsg("Profile Updated Successfully");
      return setShow(true);
    } catch (error) {
      console.log(error.message);
      setErr(error.message);
      return setShow(true);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row justify-content-center">
          <Sidebar
            preview={preview}
            name={firstName + " " + lastName}
            email={email}
          />

          <div className="col-lg-7 border-right col-profile">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 class=" heading-line">
                <b>
                  Profile <i class="fa fa-user text-muted"></i>
                </b>
              </h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Nina"
                  id="firstname"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Boobo"
                  id="lastname"
                  className="form-control"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col-md-12">
              <label className="form-label">Change Profile</label>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  onChange={loadImage}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="example100@gmail.com"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">No HP</label>
                <input
                  type="text"
                  id="Username"
                  className="form-control"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  placeholder="08214333846"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  id="Username"
                  className="form-control"
                  required
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  placeholder="input country"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Province</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="input province"
                  value={province}
                  onChange={(e) => {
                    setProvince(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">City</label>
                <input
                  type="text"
                  id="Username"
                  className="form-control"
                  required
                  placeholder="input city"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  id="Username"
                  className="form-control"
                  required
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  placeholder="Perumahan Denanyar Indah Blok-R5"
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Postal Code</label>
                <input
                  type="text"
                  id="Username"
                  className="form-control"
                  required
                  placeholder="098xx"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Birthday</label>
                <input
                  type="date"
                  className="form-control"
                  id="birthday"
                  value={birthDate}
                  onChange={(e) => {
                    setBirthDate(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <a
                href="/users"
                className="btn btn-danger profile-button me-3"
                type="button"
              >
                Cancel
              </a>
              <button
                className="btn btn-success profile-button"
                type="button"
                onClick={saveHandler}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {err === null || msg === null ? (
        ""
      ) : (
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>{msg ? "Great" : "Sorry"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {err ? (
              <div className="text-danger d-flex align-items-center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <div className="ps-3">{err}</div>
              </div>
            ) : msg ? (
              <div className="text-success d-flex align-items-center">
                <div className="ps-3">{msg}</div>
              </div>
            ) : (
              ""
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

export default Profile;
