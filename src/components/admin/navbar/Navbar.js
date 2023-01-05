import React from "react";

import "./navbar.css";
const Navbar = ({ name }) => {
  return (
    <div className="navbar-admin">
      <div className="wrapper">
        <h5 className="my-4">Welcome, {name}</h5>
        <div className="items">
          <div className="item"></div>
          <div className="item"></div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
