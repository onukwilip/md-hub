import React, { useEffect, useRef } from "react";
import css from "../styles/Services.module.scss";
import blob from "../assets/img/blob.svg";
import Rive from "@rive-app/react-canvas";
import { gsap } from "gsap";

const Services: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  // REFS
  const blobRef = useRef<HTMLImageElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const handleScrollAnimation = () => {
    if (blobRef.current && servicesRef.current) {
      //   blobRef.current.style.transform = `translateY(${})`;
      const timeline = gsap.timeline();
      const distanceFromPageTop =
        servicesRef.current.getBoundingClientRect().top;

      timeline.to(`.${css.blob}`, {
        transform: `translateY(${distanceFromPageTop * 0.1}px)`,
        animationFillMode: "forwards",
      });
      timeline
        .to(`.h1`, {
          transform: `translateY(-${distanceFromPageTop * 0.05}px)`,
          opacity: `${Math.min(
            Math.max(0, 1 - distanceFromPageTop / window.innerHeight),
            1
          )}`,
          animationFillMode: "forwards",
        })
        .to(
          `.${css.line}`,
          {
            width: `${Math.max(0, 600 - distanceFromPageTop)}px`,
            animationFillMode: "forwards",
            maxWidth: 600,
          },
          "<"
        );
      timeline.to(`.${css.left}`, {
        transform: `scale(${Math.min(
          Math.max(0, 1 - distanceFromPageTop / window.innerHeight),
          1
        )})`,
        animationFillMode: "forwards",
        ease: "power.out",
      });
      console.log();
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
    <div className={css.services} id="services" ref={servicesRef}>
      <div className={css.heading}>
        <h1 className="h1">Our Services</h1>
        <div className={css.line}></div>
      </div>
      <img src={blob} alt="" ref={blobRef} className={css.blob} />
      <div className={css.body}>
        <div className={css.left}>
          <Rive src="/woman_on_phone.riv" />
        </div>
        <div className={css.right}></div>
      </div>
    </div>
  );
};

export default Services;
