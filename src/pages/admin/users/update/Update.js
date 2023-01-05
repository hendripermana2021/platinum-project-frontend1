import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../../../components/admin/navbar/Navbar";
import Sidebar from "../../../../components/admin/sidebar/Sidebar";

import "./update.css";
import server from "../../../../server";
const Update = () => {
  const accessToken = sessionStorage.getItem("accessToken");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pictures, setPictures] = useState("");
  const [file, setFile] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  });
  const getUser = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/users/${userId}`);
      console.log({ response: get.data });
      setFirstname(get.data.data[0].firstname);
      setLastname(get.data.data[0].lastname);
      setPhone(get.data.data[0].phone);
      setEmail(get.data.data[0].email);
      setAddress(get.data.data[0].address.homeAddress);
      setCity(get.data.data[0].address.city);
      setCountry(get.data.data[0].address.country);
      setPictures(get.data.data[0].pictures);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPictures(URL.createObjectURL(image));
  };
  const updateHander = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pictures", file);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("phone", phone);
    formData.append("homeAddress", address);
    formData.append("city", city);
    formData.append("country", country);
    console.log(formData);

    try {
      await axios.put(
        `${server}/v1/api/users/edit/${userId}`,
        {
          firstname,
          lastname,
          email,
          phone: parseInt(phone),
          homeAddress: address,
          city,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigate("/admin/users");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="update">
      <Sidebar />
      <div className="updateContainer">
        <Navbar />
        <div className="top">
          <h1>Update User, (Nama Lengkap)</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                pictures
                  ? pictures
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="no-profile"
            />
          </div>
          <div className="right">
            <form onSubmit={updateHander}>
              <div className="formInput">
                <label htmlFor="file">Image :</label>
                <input
                  type="file"
                  id="file"
                  className="form-control"
                  onChange={loadImage}
                />
              </div>
              <div className="formInput">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  className="form-control"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  className="form-control"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  className="form-control"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="city">City</label>
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
              <div className="formInput">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="Country"
                  className="form-control"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>
              <button className="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
