import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

// components
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from "../../../components/footer/Footer";

import server from "../../../server";

import "./history.css";
const History = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [history, setHistory] = useState("");

  useEffect(() => {
    decoder();
    getHistory();
  });
  const decoder = async () => {
    try {
      if (!accessToken) {
        navigate("/404");
      } else {
        const decode = jwt_decode(accessToken);
        setFirstname(decode.firstname);
        setLastname(decode.lastname);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getHistory = async () => {
    try {
      const get = await axios.get(`${server}/v1/api/history`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setHistory(get.data.data);
    } catch (error) {
      console.log(error.message);
      setHistory("");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row justify-content-center">
          <Sidebar />

          <div className="col-lg-7 border-right">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 class=" heading-line">
                <b>
                  History Payment <i class="fa fa-sticky-note text-muted"></i>
                </b>
              </h4>
            </div>

            {history === "" ? (
              <div>
                <div className="col container-booking-white">
                  <div
                    className="teks-white"
                    style={{
                      marginLeft: "50px",
                      marginTop: "20px",
                    }}
                  >
                    <p className="teks-white">
                      <b>Belum Ada Pesanan</b>
                    </p>
                    <p
                      className="teks-white"
                      style={{ fontSize: "13px", textAlign: "justify" }}
                    >
                      Seluruh pesanan anda akan muncul di sini, tapi kinni anda
                      belum punya satu pun. <br />
                      Mari buat pesanan{" "}
                      <a href="/users" style={{ textDecoration: "none" }}>
                        disini
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="part3-booking">
                <br />
                <p className="ms-3 ">
                  History Payment For{" "}
                  <strong>{firstname + " " + lastname}</strong>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default History;
