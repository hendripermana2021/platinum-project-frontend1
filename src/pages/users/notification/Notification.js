import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import Sidebar from "../../../components/sidebar/Sidebar";

import "./notification.css";

const Notification = (props) => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("accessToken");
  const trueNotif = props.trueNotif;
  const falseNotif = props.falseNotif;

  useEffect(() => {
    decoder();
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
  const readHandler = async () => {
    sessionStorage.setItem("isRead", "true");
  };
  return (
    <div>
      <Navbar />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row row justify-content-center">
          <Sidebar />

          <div className="col-lg-7 border-right">
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 class="m-b-50 heading-line">
                  <b>
                    {" "}
                    Notifications <i class="fa fa-bell text-muted"></i>
                  </b>
                </h4>
              </div>
              <section class="section-50">
                <div class="container">
                  <div class="notification-ui_dd-content">
                    <p
                      className="link mt-3"
                      role={"button"}
                      onClick={readHandler}
                    >
                      Mark As Read
                    </p>
                    {falseNotif !== ""
                      ? Object.values(falseNotif).map((data) => (
                          <div class="notification-list notification-list--unread">
                            <div class="notification-list_content">
                              <div class="notification-list_detail">
                                <p class="text-muted">{data.message}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      : ""}

                    {trueNotif !== ""
                      ? Object.values(trueNotif).map((data, index) => (
                          <div class="notification-list mt-3" key={index}>
                            <div class="notification-list_content">
                              <div class="notification-list_detail">
                                <p class="text-muted">{data.message}</p>
                              </div>
                            </div>
                            <div class="notification-list_feature-img">
                              <img
                                src="https://i.imgur.com/bpBpAlH.jpg"
                                alt=""
                              />
                            </div>
                          </div>
                        ))
                      : ""}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notification;
