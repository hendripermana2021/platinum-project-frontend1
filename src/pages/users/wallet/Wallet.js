import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
// components
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from "../../../components/footer/Footer";

import "./wallet.css";
const Wallet = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    decoder();
  }, []);
  const decoder = async () => {
    try {
      if (!accessToken) {
        navigate("/404");
      } else {
        const decode = jwt_decode(accessToken);
        setFirstName(decode.firstname);
        setLastName(decode.lastname);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container rounded bg-white my-5">
        <div className="row justify-content-center">
          <Sidebar />
          <div className="col-lg-7 border-right">
            <div className="row">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 class="m-b-20 m-t-30 m-l-25 heading-line">
                  <b>
                    Wallet <i class="fa fa-dollar text-muted"></i>
                  </b>
                </h4>
              </div>
              <div className="col-lg-5">
                <div className="container-jlmsaldo">
                  <div className="form-topup">
                    <div class="col-auto" className="name-hdr">
                      <label className="form-label">Welcome, </label>
                      <p>
                        <b>{firstName + " " + lastName}</b>
                      </p>
                    </div>
                  </div>
                  <div class="col-auto mt-5">
                    <p>
                      <b className="form-topup">Your Current Saldo</b>
                    </p>
                    <p>
                      <b>Rp 120.000.00,-</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="container-saldo">
                  <div
                    class="row g-3 align-items-center"
                    className="form-topup"
                  >
                    <label className="form-label">Top Up</label>
                  </div>
                  <div class="mt-3">
                    <p>
                      <b>Masukan Jumlah (Rp)</b>
                    </p>
                    <select className="form-select">
                      <option selected>Rp 10.000.00,-</option>
                      <option value="1">Rp 20.000.00,-</option>
                      <option value="2">Rp 50.000.00,-</option>
                      <option value="3">Rp 100.000.00,-</option>
                      <option value="4">Rp 300.000.00,-</option>
                      <option value="5">Rp 500.000.00,-</option>
                    </select>
                  </div>
                  <div>
                    <div class="mt-3">
                      <p>
                        <b>Pembayaran</b>
                      </p>
                      <p>
                        ATM Transfer
                        <span className="right-desc">
                          <b>BNI 09507742</b>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div className="form-topup">
                      <p className="name-hdr">Top Up</p>
                      <span className="right-desc2"> Rp 10.000.00,-</span>
                    </div>
                    <hr />
                    <div className="form-topup">
                      <p>
                        <b>Total</b>
                      </p>
                      <span className="right-desc3">
                        <b>Rp 10.000.00,-</b>
                      </span>
                    </div>
                  </div>
                  <div className="pay-btn">
                    <button type="button" class="btn btn-outline-primary">
                      Top Up Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="footer-wallet" />
    </div>
  );
};

export default Wallet;
