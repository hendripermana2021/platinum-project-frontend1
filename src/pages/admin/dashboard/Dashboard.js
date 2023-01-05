import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

import "./dashboard.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");

  useEffect(() => {
    isLogin();
    isAdmin();
  });

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
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar name={name} />
        <div className="widgets">
          <p>Ini Widgets</p>
        </div>
        <div className="charts">
          <p>Ini Charts</p>
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
