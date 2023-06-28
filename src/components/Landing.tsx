import React from "react";
import css from "../styles/Landing.module.scss";
import bed from "../assets/img/bed.png";
import girl from "../assets/img/dark-female.png";
import wall from "../assets/img/walls.png";

const Landing = () => {
  return (
    <div className={css.landing} id="home">
      <div className={css.overlay}></div>
      <img src={bed} alt="" className={css.bed} />
      <img src={wall} alt="" className={css.wall} />
      <img src={girl} alt="" className={css.girl} />
      <div className={css.text}>
        <span>Welcome to</span>
        <p>Manassel data hub</p>
      </div>
      <br />
      <blockquote>
        Success comes from delegating, risk-taking, and having a great team!
        <div className={css.line}></div>
      </blockquote>
    </div>
  );
};

export default Landing;
