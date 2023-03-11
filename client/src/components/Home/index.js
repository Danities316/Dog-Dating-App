import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../Navbar";
import "../../App.scss";

import bannerImage from "../../images/8.jpg";
import search_btn from "../../images/search_btn.gif";
import p_search_btn from "../../images/partner_search_bg.gif";
import pic_2 from "../../images/pic_2.gif";
import pic_3 from "../../images/pic_3.gif";
import pic_1 from "../../images/pic_1.gif";
import pic_4 from "../../images/pic_4.gif";

export default function Home() {
  
  const [formData, setFormData] = useState({
    DogType: "",
    DateOfBirth: "",
    DogDescription: "",
    Sex: "",
    DogBread: "",
    petname: "",
    photo: ""
  });

  const {
    DogType,
    DateOfBirth,
    DogDescription,
    Sex,
    DogBread,
    petname,
    photo
  } = formData

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createDog(formData))
    // Clear the form
    setFormData('')
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  };




  return (
    <>
      <Navbar />
      {/* hero section */}
      <div
        className="hero-image"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "50vh",
        }}
      >
        <div className="hero-text">
          <h1>Dogs Date Dogs</h1>
          <p>Let Your Dog Date It Kinds</p>
          <button className="btn">Get Started</button>
        </div>
        <div className="row">
          <div id="container">
            <div className="partner_search">
              <div className="inner_border">
                <div
                  className="form_container"
                  style={{ backgroundImage: `url(${p_search_btn})` }}
                >
                  <h3>Partner Search</h3>
                  <form action="#" method="POST">
                    <fieldset>
                      <div className="search_row">
                        <div className="search_column_1">
                          <label>I am a</label>
                        </div>
                        <div className="search_column_2">
                          <select className="gender">
                            <option>Male</option>
                          </select>
                          <label>Seeking a</label>
                          <select className="gender">
                            <option>Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="search_row">
                        <div className="search_column_1">
                          <label>Looking for a</label>
                        </div>
                        <div className="search_column_2">
                          <select className="date">
                            <option>Date</option>
                          </select>
                        </div>
                      </div>
                      <div className="search_row">
                        <div className="search_column_1">
                          <label>I was born</label>
                        </div>
                        <div className="search_column_2">
                          <select className="dob">
                            <option>Month</option>
                          </select>
                          <select className="dob">
                            <option>Date</option>
                          </select>
                          <select className="dob">
                            <option>Year</option>
                          </select>
                        </div>
                      </div>
                      <div className="search_row">
                        <div className="search_column_1">
                          <label>By Profile ID</label>
                        </div>
                        <div className="search_column_2">
                          <input type="text" name="" value="" />
                          <label className="check">With Photo</label>
                          <input
                            type="checkbox"
                            name=""
                            value=""
                            className="checkbox"
                          />
                        </div>
                      </div>
                      <div className="search_row last">
                        <div className="search_column_1">&nbsp;</div>
                        <div className="search_column_2">
                          <input
                            type="image"
                            src={search_btn}
                            className="search_btn"
                          />
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="heading">Recently Added Profiles</h1>
      <div class="cardContainer">
        <div class="card">
          <div class="testimonialContainer">
            <img class="profilePic" src={pic_1} />
            <div>
              <span>Name: James Anderson</span>
            </div>
            <div>
              <span>Age: 23 Years</span>
            </div>
            <div>
              <span>Location: Badagry</span>
            </div>
            <p>Bio: Shawn is a hard working and comitted individual</p>
          </div>
        </div>
        <div class="card">
          <div class="testimonialContainer">
            <img class="profilePic" src={pic_3} />
            <div>
              <span>Name: John Doe</span>
            </div>
            <div>
              <span>Age: 13 Years</span>
            </div>
            <div>
              <span>Location: Uyo</span>
            </div>
            <p>Bio: John is a hard working and comitted individual</p>
          </div>
        </div>
        <div class="card">
          <div class="testimonialContainer">
            <img class="profilePic" src={pic_2} />
            <div>
              <span>Name: Make</span>
            </div>
            <div>
              <span>Age: 23 Years</span>
            </div>
            <div>
              <span>Location: Kano</span>
            </div>
            <p>Bio: Shawn is a hard working and comitted individual</p>
          </div>
        </div>
      </div>
    </>
  );
}
