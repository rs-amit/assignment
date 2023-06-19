import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/UserReducer";
import Swal from "sweetalert2";
import logo from "../../assets/loan.png";

function Header() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    if (user.currentUser) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to logout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout",
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: () => {
          dispatch(logout());
        },
      });
    }
  };

  return (
    <div className="Header">
      <div className="Header-wrapper">
        <Link to="/">
          <div className="headerloginLogo">
            <img className="headerlogo" src={logo} alt="" />
          </div>
        </Link>
        <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
          <div className="nav" onClick={LogoutHandler}>
            Login / Register
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
