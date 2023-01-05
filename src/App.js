import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import axios from "axios";
import server from "./server";

import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NotFound from "./pages/notFound/NotFound";

// Users
import DashboardUser from "./pages/users/dashboard/Dashboard";
import Profile from "./pages/users/profile/Profile";
import Booking from "./pages/users/booking/Booking";
import Order from "./pages/users/order/Order";
import Wishlist from "./pages/users/wishlist/Wishtlist";
import Wallet from "./pages/users/wallet/Wallet";
import History from "./pages/users/history/History";
import Notification from "./pages/users/notification/Notification";
import Payment from "./pages/users/payment/Payment";

// Admins
import DashboardAdmin from "./pages/admin/dashboard/Dashboard";
import Users from "./pages/admin/users/User";
import UpdateUser from "./pages/admin/users/update/Update";
import Flight from "./pages/admin/flights/Flight";
import NewFlight from "./pages/admin/flights/new/New";
import UpdateFlight from "./pages/admin/flights/update/Update";
import Bookings from "./pages/admin/bookings/Booking";
import Airport from "./pages/admin/airports/Airport";
import NewAirport from "./pages/admin/airports/new/New";
import UpdateAirport from "./pages/admin/airports/update/Update";
const App = () => {
  const [trueNotif, setTrueNotif] = useState("");
  const [falseNotif, setFalseNotif] = useState("");

  useEffect(() => {
    getFalseNotif();
    getTrueNotif();
  }, [trueNotif, falseNotif]);

  useEffect(() => {
    changeNotifHandler();
  });
  const changeNotifHandler = async () => {
    const isRead = sessionStorage.getItem("isRead");
    const accessToken = sessionStorage.getItem("accessToken");
    console.log({ isRead, type: typeof isRead });
    if (isRead !== null) {
      if (isRead === "true") {
        try {
          await axios.post(`${server}/v1/api/notif/read`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  };

  const getFalseNotif = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const getFalse = await axios.get(`${server}/v1/api/notif/all/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setFalseNotif(getFalse.data.data);
      localStorage.setItem("fNotif", JSON.stringify(getFalse.data.data));
    } catch (error) {
      setFalseNotif("");
    }
  };
  const getTrueNotif = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      const getTrue = await axios.get(`${server}/v1/api/notif/all/1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTrueNotif(getTrue.data.data);
    } catch (error) {
      setTrueNotif("");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
          <Route path="auth" element={<Login />} />
          <Route path="reg" element={<Register />} />
          <Route path="404" element={<NotFound />} />
        </Route>
        <Route path="/users">
          <Route index element={<DashboardUser />} />
          <Route path="profile" element={<Profile />} />
          <Route path="booking" element={<Booking />} />
          <Route path="order" element={<Order />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="history" element={<History />} />
          <Route
            path="notification"
            element={
              <Notification trueNotif={trueNotif} falseNotif={falseNotif} />
            }
          />
          <Route path="payment/:paymentId" element={<Payment />} />
        </Route>
        <Route path="/admin">
          <Route index element={<DashboardAdmin />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:userId" element={<UpdateUser />} />
          <Route path="flights" element={<Flight />} />
          <Route path="newflight" element={<NewFlight />} />
          <Route path="flights/:flightId" element={<UpdateFlight />} />
          <Route path="airports" element={<Airport />} />
          <Route path="newairport" element={<NewAirport />} />
          <Route path="airports/:airportId" element={<UpdateAirport />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
