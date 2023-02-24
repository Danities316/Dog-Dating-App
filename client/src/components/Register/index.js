import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./signin.scss";
import Navbar from "../Navbar";

export default function Signin() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("http://localhost:3000/api/users/register", {
        data: {
          username: registerUsername,
          password: registerPassword,
          password2: registerPassword2,
          email: registerEmail,
        },
        withCredentials: true,
      });
      console.log(data)
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
            <div className="welcome">Hello There!</div>
            <div className="subtitle">
              We're almost done. Before using our services you need to create an
              account.
            </div>
            <form action="POST">
              <div className="input-fields">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input-line full-width"
                  onChange={(e) => setRegisterUsername(e.target.value)}
                ></input>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input-line full-width"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                ></input>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input-line full-width"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                ></input>
                 <input
                  type="password"
                  name="password2"
                  placeholder="Confirmed Password"
                  className="input-line full-width"
                  onChange={(e) => setRegisterPassword2(e.target.value)}
                ></input>
              </div>
              <div className="spacing">
                Already Have An Account <span className="highlight">Login</span>
              </div>
              <div>
                <button className="ghost-round full-width" onClick={submit}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
