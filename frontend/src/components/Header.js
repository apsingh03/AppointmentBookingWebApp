import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm  bg-dark ">
        <div className="container-fluid ">
          <a className="navbar-brand text-white" href="#">
            BookAppointment
          </a>
          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/adminAddTiming">
                  Admin Add Timing
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/adminCheckAppointments"
                >
                  Admin Check Appointments
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/userProfile">
                  User Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
