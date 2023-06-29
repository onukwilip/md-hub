import React, { FC, useEffect, useRef } from "react";
import css from "../styles/Services.module.scss";
import blob from "../assets/img/blob.svg";
import Rive from "@rive-app/react-canvas";
import { gsap } from "gsap";
import { EachServiceClass, SeriviceCard } from "../utils";
import mtn from "../assets/img/mtn.png";
import airtel from "../assets/img/airtel.png";
import glo from "../assets/img/glo.png";
import nineMobile from "../assets/img/9mobile.png";

const serviceCards = [
  new SeriviceCard(
    mtn,
    [
      new EachServiceClass(300, 1, 30),
      new EachServiceClass(600, 2, 30),
      new EachServiceClass(900, 3, 30),
      new EachServiceClass(1200, 4, 30),
      new EachServiceClass(1500, 5, 30),
      new EachServiceClass(3000, 10, 30),
    ],
    "#e2c044"
  ),
  new SeriviceCard(
    airtel,
    [
      new EachServiceClass(300, 1, 30),
      new EachServiceClass(600, 2, 30),
      new EachServiceClass(900, 3, 30),
      new EachServiceClass(1200, 4, 30),
      new EachServiceClass(1500, 5, 30),
      new EachServiceClass(3000, 10, 30),
    ],
    "orangered",
    {
      top: -170,
      transform: "scale(0.9)",
    }
  ),
  new SeriviceCard(
    glo,
    [
      new EachServiceClass(300, 1, 30),
      new EachServiceClass(600, 2, 30),
      new EachServiceClass(900, 3, 30),
      new EachServiceClass(1200, 4, 30),
      new EachServiceClass(1500, 5, 30),
      new EachServiceClass(3000, 10, 30),
    ],
    "darkgreen"
  ),
  new SeriviceCard(
    nineMobile,
    [
      new EachServiceClass(250, 1, 30),
      new EachServiceClass(500, 2, 30),
      new EachServiceClass(750, 3, 30),
      new EachServiceClass(1000, 4, 30),
      new EachServiceClass(1250, 5, 30),
      new EachServiceClass(1500, 10, 30),
    ],
    "green",
    {
      top: -110,
      transform: "scale(0.9)",
    }
  ),
];

const Services: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  // REFS
  const blobRef = useRef<HTMLImageElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollAnimation = () => {
    if (blobRef.current && servicesRef.current) {
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

      const serviceCards = document.querySelectorAll(
        `.${css.card}`
      ) as NodeListOf<HTMLDivElement>;

      serviceCards.forEach((card, i) => {
        gsap.to(card, {
          transform: `rotateX(${distanceFromPageTop * 0.1}deg) translateZ(${
            distanceFromPageTop * 0.1
          }px)`,
          animationFillMode: "forwards",
          opacity: `${Math.min(
            Math.max(0, 1 - distanceFromPageTop / window.innerHeight),
            1
          )}`,
          delay: i * 0.5,
        });
      });
    }
  };

  const handleCardsScroll = (e: Event) => {
    const serviceCards = document.querySelectorAll(
      `.${css.card}`
    ) as NodeListOf<HTMLDivElement>;

    serviceCards.forEach((card, i) => {
      if (cardsContainerRef.current) {
        const distanceFromLeft =
          i < 3
            ? Math.abs(card.offsetLeft - cardsContainerRef.current.scrollLeft)
            : Math.abs(card.offsetLeft - cardsContainerRef.current.scrollLeft) *
              0.5;
        gsap.to(card, {
          transform: `rotateX(${distanceFromLeft * 0.04}deg) translateZ(${
            distanceFromLeft * 0.04
          }px)`,
          animationFillMode: "forwards",
          opacity: `${Math.min(
            Math.max(0, 1 - distanceFromLeft / window.innerHeight),
            1
          )}`,
        });
      }
    });
  };

  useEffect(() => {
    if (appRef.current)
      appRef.current.addEventListener("scroll", handleScrollAnimation);
    if (cardsContainerRef.current)
      cardsContainerRef.current.addEventListener("scroll", handleCardsScroll);

    return () => {
      if (appRef.current)
        appRef.current.removeEventListener("scroll", handleScrollAnimation);
      if (cardsContainerRef.current)
        cardsContainerRef.current.removeEventListener(
          "scroll",
          handleCardsScroll
        );
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
        <div className={css.right} ref={cardsContainerRef}>
          {serviceCards.map((eachService) => (
            <Card service={eachService} />
          ))}
          {/* <Card service={serviceCards[3]} /> */}
        </div>
      </div>
    </div>
  );
};

const Card: FC<{ service: SeriviceCard }> = ({ service }) => {
  return (
    <div className={css.card}>
      <div
        className={css["img-container"]}
        style={{ background: service.color }}
      >
        <img src={service.image} alt="" style={service.imgPosition} />
      </div>
      <div className={css.content}>
        {service.list.map((eachItem) => (
          <>
            <li>
              Pay{" "}
              <span>
                {eachItem.amount?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "NGN",
                })}
              </span>{" "}
              get <span>{eachItem.data}GB</span> for {eachItem.days} days
            </li>
          </>
        ))}
      </div>
    </div>
  );
};

export default Services;
