import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/Api"
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import logo from "../assets/loan.png"

function Login() {
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error, isFetching } = useSelector((state) => state.user);

  const ShowPasswordToggle = () => {
    if (showPasswordToggle) {
      setShowPasswordToggle(false);
    } else {
      setShowPasswordToggle(true);
    }
  };

// Validate form fields
  const isEmpty = () => {
    return !userName || !password;
  };


  const getUser = async (e) => {
    e.preventDefault();
    LoginUser(dispatch, { userName, password });
  };


  const LoginGuest = () => {
    setUserName("admin");
    setPassword("admin23eww");
  };

  useEffect(() => {
    if (currentUser) {
      setPassword("");
      setUserName("");
      navigate("/");
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong, please try again later",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [currentUser, error]);


  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <Link to="/">
        <div className='loginLogo'>
          <img
            className='logo'
            src={logo} 
            alt=""
          />
        </div>
      </Link>
        <form className="loginForm" onSubmit={getUser}>
          <div className="inputSection">
            <label className="inputLabel">USERNAME</label>
            <input
              className="InputField"
              placeholder="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="inputSection">
            <label className="inputLabel">PASSWORD</label>
            <input
              className="InputField"
              type={showPasswordToggle ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="ShowPassword" onClick={ShowPasswordToggle}>
              {showPasswordToggle ? "HIDE" : "SHOW"}
            </span>
          </div>
          <div className="PrivacyAgreement">
            By continuing, you agree to Firstcry's Conditions of Use and Privacy
            Notice.
          </div>
          <button className="SubmitBtn"  disabled={isFetching || isEmpty()}>
          {isFetching ? <ClipLoader color="white" size={15} /> : "LOGIN"}
          </button>
        </form>
        <div className="guest-wrapper">
          LOGIN AS A GUEST <button className="guest" onClick={() => LoginGuest()}> GUEST </button>
        </div>
        <div className="accountConfirmation">
          DO YOU HAVE A ACCOUNT? <Link to="/register"> SignUp</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
