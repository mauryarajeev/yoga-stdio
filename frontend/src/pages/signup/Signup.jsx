import React, { useState } from "react";
import "./signup.css";
import { Navigate, useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

export default function Signup() {
  const [errors, setErrors] = useState("");
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const gotoLogin = (e) => {
    e.preventDefault();
    navigate("/signin");
  };
  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFetching(true);
    setErrors(false);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    if (user.password === user.cpassword) {
      try {
        user.age = parseFloat(user.age);
        console.log(user);
        const { data } = await axios
          .post("/api/auth/signup", user, config)
          .catch((err) => {
            if (err.response.status === 409) {
              setErrors("User Already Exist!");
              throw new Error(`user already exist`);
            } else if (err.response.status === 400) {
              setErrors("user's age must be in 18 to 65 years");
              throw new Error(`user's age must be in 18 to 65 years`);
            } else {
              setErrors("Internal Server Error");
              throw new Error(`Internal Server Error`);
            }
            throw err;
          });
        localStorage.setItem("authToken", data.token);
        setIsFetching(false);
        navigate("/chooseplan");
      } catch (err) {
        setIsFetching(false);
      }
    } else {
      alert("Password don't match!");
      setIsFetching(false);
    }
  };

  return (
    <div className="signupContainer">
      <div className="signupWrapper">
        <form className="signupRight" onSubmit={handleSubmit}>
          <div className="signupBox">
            {errors ? (
              <div className="errorDiv">
                <span className="errorMessage">{errors}</span>
              </div>
            ) : null}
            {/* <div className="divinput" > 
                        <input type="text" required   
                        className="signupInput" 
                        name="firstname" 
                        value={user.firstname} 
                        onChange={handleChange} />
                        <label for="">First name</label>
                        </div> */}

            <div className="divinput">
              <input
                type="text"
                required
                className="signupInput"
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
              />
              <label for="">full name</label>
            </div>

            <div className="divinput">
              <input
                type="email"
                required
                className="signupInput"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <label for="email">Email</label>
            </div>

            <div className="divinput">
              <input
                type="Number"
                required
                className="signupInput"
                name="age"
                value={user.age}
                onChange={handleChange}
              />
              <label for="age">Age</label>
            </div>

            <div className="divinput">
              <input
                type="password"
                required
                className="signupInput"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <label for="">Password</label>
            </div>

            <div className="divinput">
              <input
                type="password"
                required
                className="signupInput"
                name="cpassword"
                value={user.cpassword}
                onChange={handleChange}
              />
              <label for="">Confirm Password</label>
            </div>

            <button
              type="submit"
              className="signupButton"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Sign Up"
              )}
            </button>

            <button
              onClick={gotoLogin}
              className="loginRegisterButton"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log Into Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
