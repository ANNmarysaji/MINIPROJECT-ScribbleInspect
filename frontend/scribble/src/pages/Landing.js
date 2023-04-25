import React from "react";
import gazing from "../assets/images/gazing.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Assignment <span>Evaluator</span>
          </h1>
          <p>
            Your handwriting, our expertise: Delivering superior evaluation
            services for your assignments!Simply upload handwritten assignments
            and receive objective, accurate grades instantly. Try it now and
            save time while ensuring fair and consistent grading.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img
          src={gazing}
          alt="A student gazing at a document"
          className="img main-img"
        />
      </div>
    </Wrapper>
  );
};

export default Landing;
