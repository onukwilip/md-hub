import React, { useEffect, useRef } from "react";
import css from "../styles/Header.module.scss";
import logo from "../assets/img/logo.png";
import { gsap } from "gsap";

const Header: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScrollAnimation = () => {
    console.log(appRef?.current?.scrollTop);

    if (appRef.current?.scrollTop && appRef.current?.scrollTop > 790) {
      gsap.to(`.${css.header}`, {
        background: `rgba(0,0,0,0.5)`,
        backdropFilter: "blur(10px)",
        animationFillMode: "forwards",
      });
    } else {
      gsap.to(`.${css.header}`, {
        background: `transparent`,
        backdropFilter: "blur(0)",
        animationFillMode: "forwards",
      });
    }
  };

  useEffect(() => {
    if (appRef.current)
      appRef.current.addEventListener("scroll", handleScrollAnimation);

    return () => {
      if (appRef.current)
        appRef.current.addEventListener("scroll", handleScrollAnimation);
    };
  }, [appRef, appRef.current]);

  return (
    <div className={css.header} ref={headerRef}>
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
