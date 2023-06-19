import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import logo from "../assets/loan.png"

function Register() {
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsfetching] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const ShowPasswordToggle = () => {
    if (showPasswordToggle) {
      setShowPasswordToggle(false);
    } else {
      setShowPasswordToggle(true);
    }
  };

  const isEmpty = () => {
    return !userName || !password || !confirmPassword || !email;
  };

  // Validate form fields
  const LoginValidation = () => {
    return (
      password !== confirmPassword ||
      password.length <= 9 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
  };


  const SubmitClickHandler = async (e) => {
    e.preventDefault();

    if (LoginValidation()) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please enter a valid data",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setIsfetching(true);
      await axios
        .post("https://mybasket-server.jerryroy.repl.co/api/auth/register", {
          username: userName,
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          setUserName("");
          setEmail("");
          setPassword("");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your account has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something went wrong, please try again later",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => {
          setIsfetching(false);
        });
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <Link to="/">
        <div className='registerLogo'>
          <img
            className='logo'
            src={logo}
            alt=""
          />
        </div>
      </Link>
        <form className="loginForm" onSubmit={SubmitClickHandler}>
          <div className="inputSection">
            <label className="inputLabel">USERNAME</label>
            <input
              className="InputField"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="inputSection">
            <label className="inputLabel">EMAIL</label>
            <input
              className="InputField"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputSection">
            <label className="inputLabel">PASSWORD</label>
            <input
              className="InputField"
              type={showPasswordToggle ? "text" : "password"}
              placeholder="Please Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="ShowPassword" onClick={ShowPasswordToggle}>
              {showPasswordToggle ? "HIDE" : "SHOW"}
            </span>
          </div>

          <div className="inputSection">
            <label className="inputLabel">CONFIRM PASSWORD</label>
            <input
              className="InputField"
              type="password"
              placeholder="Please Enter Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
        
          </div>

          <div className="PrivacyAgreement">
            By continuing, you agree to Firstcry's Conditions of Use and Privacy
            Notice.
          </div>
          <button className="SubmitBtn" disabled={isFetching || isEmpty()}>
            {isFetching ? <ClipLoader color="white" size={15} /> : "REGISTER"}
          </button>
        </form>
  
        <div className="accountConfirmation">
          DO YOU HAVE A ACCOUNT? <Link to="/login"> LOGIN</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
