import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

import "./airport.css";
import axios from "axios";
import server from "../../../server";
const Airport = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [name, setName] = useState("");
  const [airports, setAirports] = useState("");

  useEffect(() => {
    isLogin();
    isAdmin();
  });
  useEffect(() => {
    getAirports();
  }, []);

  const getAirports = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/airports`);
      setAirports(get.data.data);
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
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar name={name} />
        <div className="airportContent">
          <h2 className="mt-3">Airport Data</h2>
          <div className="d-grid col-2 p-3">
            <Link
              to={"/admin/newairport"}
              role={"button"}
              className="btn btn-outline-primary"
            >
              {" "}
              Add New Airport
            </Link>
          </div>
          <div className="row ms-2">
            {Object.values(airports).map((data, index) => (
              <div className="col-md-4 my-3">
                <div className="card container">
                  <div className="card-header">
                    <p>
                      Airport ID : <b>{data.id}</b>
                    </p>
                  </div>
                  <div className="card-body">
                    <p>
                      Name : <b>{data.name}</b>
                    </p>
                    <p>
                      Code : <b>{data.code}</b>
                    </p>
                    <p>
                      City : <b>{data.country}</b>
                    </p>
                    <p>
                      Terminal : <b>{data.terminal}</b>
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md d-grid">
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            navigate(`/admin/airports/${data.id}`);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airport;
