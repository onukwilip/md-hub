import React from "react";
import css from "../styles/Header.module.scss";
import logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <div className={css.header}>
      <div className={css.logo}>
        <img src={logo} alt="" />
      </div>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact Us</a>
      </nav>
    </div>
  );
};

export default Header;
