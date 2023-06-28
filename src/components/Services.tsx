import React, { useEffect, useRef } from "react";
import css from "../styles/Services.module.scss";
import blob from "../assets/img/blob.svg";
import Rive from "@rive-app/react-canvas";

const Services: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  // REFS
  const blobRef = useRef<HTMLImageElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const handleScrollAnimation = () => {
    if (blobRef.current && servicesRef.current) {
      //   blobRef.current.style.transform = `translateY(${})`;
      console.log(servicesRef.current.getBoundingClientRect().top);
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
        <h1>Our Services</h1>
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
