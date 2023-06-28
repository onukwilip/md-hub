import React, { FC, useEffect, useRef } from "react";
import css from "../styles/Landing.module.scss";
import bed from "../assets/img/bed.png";
import girl from "../assets/img/dark-female.png";
import wall from "../assets/img/walls.png";
import { gsap } from "gsap";
import Splitting from "splitting";

const Landing: FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  const landingRef = useRef<HTMLDivElement>(null);

  const handleScrollAnimation = (e: Event) => {
    const timeline = gsap.timeline();

    if (landingRef.current) {
      const distanceFromTop = landingRef?.current?.getBoundingClientRect().top;

      timeline.to(".span", {
        transform: `translateX(${distanceFromTop * 0.1}px)`,
        animationFillMode: "forwards",
      });

      Splitting({ target: "#name", by: "chars" });

      const charElements = document.querySelectorAll(
        "#name .char"
      ) as NodeListOf<HTMLSpanElement>;

      charElements.forEach((char, i) => {
        gsap.to(char, {
          y: -distanceFromTop * 0.1,
          opacity: 1,
          animationFillMode: "forwards",
          delay: i * 0.1,
          ease: "power.out",
        });
      });

      timeline.to(`.${css.line}`, {
        width: `${Math.max(0, 600 + distanceFromTop)}px`,
        animationFillMode: "forwards",
      });
    }
  };

  const initialAnimation = () => {
    const timeline = gsap.timeline();
    Splitting({ target: "#name", by: "chars" });

    timeline.from(`.${css.girl}`, {
      transform: `scale(3)`,
      // animationFillMode: "forwards",
    });

    const charElements = document.querySelectorAll(
      "#name .char"
    ) as NodeListOf<HTMLSpanElement>;

    timeline.from(".span", {
      transform: `translateX(${-100}px)`,
      animationFillMode: "forwards",
      animationDuration: "200ms",
      ease: "power.out",
    });

    charElements.forEach((char, i) => {
      gsap.set(char, { y: 50, opacity: 0 });

      gsap.to(char, {
        y: 0,
        opacity: 1,
        animationFillMode: "forwards",
        delay: i * 0.1,
        ease: "power.out",
      });
    });

    timeline.set(`.${css.line}`, { width: 5 });

    timeline.to(`.${css.line}`, {
      width: 600,
      animationFillMode: "forwards",
    });
  };

  useEffect(() => {
    initialAnimation();
    if (appRef.current)
      appRef.current.addEventListener("scroll", handleScrollAnimation);

    return () => {
      if (appRef.current)
        appRef.current.addEventListener("scroll", handleScrollAnimation);
    };
  }, [appRef, appRef.current]);
  return (
    <div className={css.landing} ref={landingRef} id="home">
      <div className={css.overlay}></div>
      <img src={bed} alt="" className={css.bed} />
      <img src={wall} alt="" className={css.wall} />
      <img src={girl} alt="" className={css.girl} />
      <div className={css.content}>
        <div className={css.text}>
          <span className="span">Welcome to</span>
          <p id="name">Manassel data hub</p>
        </div>
        <br />
        <blockquote>
          Success comes from delegating, risk-taking, and having a great team!
          <div className={css.line}></div>
        </blockquote>
      </div>
    </div>
  );
};

export default Landing;
