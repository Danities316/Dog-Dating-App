import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signin.scss";
import Navbar from "../Navbar";
export default function Signin() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/api/users/login",  {
          email: loginEmail,
          password: loginPassword,
          withCredentials: true
        }
      );
        console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bold-line"></div>
      <div className="container">
        <div className="window">
          <div className="overlay"></div>
          <div className="content">
            <div className="welcome">Welcome Back!</div>
            <div className="subtitle">Let Your Dogs Loves it Kind.</div>
            <form action="POST">
              <div className="input-fields">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-line full-width"
                  onChange={(e) => setLoginEmail(e.target.value)}
                ></input>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input-line full-width"
                  onChange={(e) => setLoginPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <button className="ghost-round full-width" onClick={submit}>
                  Login
                </button>
              </div>
              <br />
              OR
              <br />
              <button className="ghost-round full-width">
                {" "}
                <Link to="/signup">SignUp</Link>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
