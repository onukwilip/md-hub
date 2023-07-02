import React, { useEffect, useRef, useState } from "react";
import css from "../styles/Header.module.scss";
import logo from "../assets/img/logo.png";
import manuBlob from "../assets/img/menu-blob.svg";
import { gsap } from "gsap";

const Header: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);

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
    <>
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
        <div className={css.hamburger}>
          <i
            className="fas fa-bars-staggered"
            onClick={() => setShowMenu(true)}
          ></i>
        </div>
      </div>
      {showMenu && <MobileMenu closeMenu={setShowMenu} />}
    </>
  );
};

const MobileMenu: React.FC<{ closeMenu: Function }> = ({ closeMenu }) => {
  const bgImgRef = useRef<HTMLImageElement>(null);
  const onClose = () => {
    const mobileNav = document.getElementById("mobileNav") as HTMLDivElement;

    gsap.to(`.${css.bg}`, {
      top: "-25rem",
      right: "-52rem",
      animationFillMode: "forwards",
      ease: "power.out",
      duration: 0.5,
    });

    Array.from(mobileNav.children).forEach((menu, i) => {
      gsap.to(menu, {
        right: "-52rem",
        animationFillMode: "forwards",
        ease: "power.out",
        duration: 0.5,
        delay: i * 0.1,
      });
    });

    setTimeout(() => closeMenu(false), 400);
  };

  const initialAnimation = () => {
    const mobileNav = document.getElementById("mobileNav") as HTMLDivElement;

    gsap.from(bgImgRef.current, {
      top: "-25rem",
      right: "-52rem",
      animationFillMode: "forwards",
      ease: "power.out",
    });

    Array.from(mobileNav.children).forEach((menu, i) => {
      gsap.from(menu, {
        right: "-52rem",
        animationFillMode: "forwards",
        ease: "power.out",
        duration: 0.5,
        delay: i * 0.1,
      });
    });
  };

  const onLinkClick = () => {
    onClose();
  };

  useEffect(() => {
    initialAnimation();
  }, []);

  return (
    <>
      <div className={css["mobile-menu"]}>
        <i className="fas fa-xmark" onClick={onClose}></i>
        <br />
        <nav id="mobileNav">
          <a href="#home" onClick={onLinkClick}>
            Home
          </a>
          <a href="#about" onClick={onLinkClick}>
            About
          </a>
          <a href="#services" onClick={onLinkClick}>
            Services
          </a>
          <a href="#contact" onClick={onLinkClick}>
            Contact Us
          </a>
        </nav>
        <img className={css.bg} src={manuBlob} ref={bgImgRef} alt="bg" />
      </div>
    </>
  );
};

export default Header;
