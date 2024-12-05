import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
            Welcome to A_FOOD, where we craft burgers that go beyond the ordinary. Our passion for quality ingredients and bold flavors drives everything we do. From juicy, hand-pressed patties to fresh, locally sourced produce, every bite tells a story of dedication and care.
            At A_FOOD, we believe in more than just great food — we aim to create an unforgettable dining experience. Whether you're enjoying our signature classics, exploring adventurous flavor combinations, or savoring a cold drink with friends, you’re always in for a treat.
            </p>
            
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;