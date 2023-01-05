import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import server from "../../../server";

import "./user.css";
import axios from "axios";
const User = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");

  const [msg, setMsg] = useState("");

  // For Alert Show
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setMsg("");
  };

  useEffect(() => {
    decoder();
    getUsers();
    isAdmin();
  });

  const decoder = () => {
    try {
      if (!accessToken) {
        navigate("/404");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/users`);
      setUsers(get.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const isAdmin = () => {
    const decode = jwt_decode(accessToken);
    console.log({ id: decode.role_id, type: typeof decode.role_id });
    if (decode.role_id !== 1) return navigate("/404");
    setName(decode.firstname + " " + decode.lastname);
  };
  const deleteHandler = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${server}/v1/api/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMsg("Delete Successfully");
      return setShow(true);
    } catch (error) {
      console.log(error.message);
      setMsg("Delete Fail");
      return setShow(true);
    }
  };
  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <Navbar name={name} />
        <div className="content container mt-4">
          <h2>All Users Data</h2>
          <div className="row">
            {Object.values(users).map((data, index) => (
              <div className="col-md-4 mt-3" key={index}>
                <div className="card container">
                  <div className="card-header">
                    <h2 className="text-center">{data.roles.roleName}</h2>
                  </div>
                  <div className="card-body">
                    <img
                      src={
                        data.pictures === "" || data.pictures === null
                          ? "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                          : data.pictures
                      }
                      alt="profile-pict"
                      className="rounded-circle profile-pict mt-5"
                    />
                    <ul className="list-group list-group-horizontal">
                      <li className="title-profile">Name</li>
                      <li className="data-profile">
                        {data.firstname + " " + data.lastname}
                      </li>
                    </ul>
                    <ul className="list-group list-group-horizontal">
                      <li className="title-profile">Gender</li>
                      <li className="data-profile">{data.gender}</li>
                    </ul>
                    <ul className="list-group list-group-horizontal">
                      <li className="title-profile">Phone</li>
                      <li className="data-profile">{data.phone}</li>
                    </ul>
                    <ul className="list-group list-group-horizontal">
                      <li className="title-profile">Email</li>
                      <li className="data-profile">{data.email}</li>
                    </ul>

                    <ul className="list-group list-group-horizontal">
                      <li className="title-profile">Address</li>
                      <li className="data-profile">
                        {data.address === null ?"": data.address.homeAddress +
                          " " +
                          data.address.city +
                          " " +
                          data.address.province}
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer d-flex justify-content-center">
                    <div className="d-grid me-4">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteHandler(data.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="d-grid">
                      <Link
                        className="btn btn-success"
                        to={`/admin/users/${data.id}`}
                      >
                        Update
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            {msg === "Delete Successfully" ? (
              <div className="text-success d-flex align-items-center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <div className="ps-3">{msg}</div>
              </div>
            ) : (
              <div className="text-danger d-flex align-items-center">
                <i className="fa-solid fa-circle-exclamation"></i>
                <div className="ps-3">{msg}</div>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default User;
