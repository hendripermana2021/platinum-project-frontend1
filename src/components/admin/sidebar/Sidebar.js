import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import server from "../../../server";

import "./sidebar.css";
const Sidebar = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.delete(`${server}/v1/api/logout`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      sessionStorage.clear();
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sidebar-admin">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo ">Flit Airlines</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <div className="ul">
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Dashboard</span>
            </div>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Users</span>
            </div>
          </Link>

          <Link to="/admin/bookings" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Bookings</span>
            </div>
          </Link>
          <Link to="/admin/flights" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Flights</span>
            </div>
          </Link>

          <Link to="/admin/airports" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Airports</span>
            </div>
          </Link>
          <Link to="/admin/wallet" style={{ textDecoration: "none" }}>
            <div className="li">
              <span>Wallets</span>
            </div>
          </Link>
          <p className="title">Admin</p>
          <div className="li" role={"button"} onClick={logoutHandler}>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
