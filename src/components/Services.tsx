import React, { FC, MouseEventHandler, useEffect, useRef } from "react";
import css from "../styles/Services.module.scss";
import blob from "../assets/img/blob.svg";
import Rive from "@rive-app/react-canvas";
import { gsap } from "gsap";
import { EachServiceClass, SeriviceCard } from "../utils";
import mtn from "../assets/img/mtn.png";
import airtel from "../assets/img/airtel.png";
import glo from "../assets/img/glo.png";
import otherServices from "../assets/img/other-services.png";
import nineMobile from "../assets/img/9mobile.png";
import Slider from "react-slick";
import VanillaTilt from "vanilla-tilt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    undefined,
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
    undefined,
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
    undefined,
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
    undefined,
    "green",
    {
      top: -110,
      transform: "scale(0.9)",
    }
  ),
  new SeriviceCard(
    otherServices,
    undefined,
    [
      "Payment of electricity bills.",
      "Cable subscription (DSTV, GOTV, Startimes).",
      "Conversion of airtime to cash (for all networks).",
    ],
    "purple",
    {
      top: -70,
      transform: "scale(1.2)",
    }
  ),
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

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

      if (distanceFromPageTop > -327) {
        timeline.to(`.${css.blob}`, {
          transform: `translateY(${distanceFromPageTop * 0.1}px)`,
          animationFillMode: "forwards",
        });
      }
      timeline
        .to(`.service-h1`, {
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
            width: `${Math.max(0, 400 - distanceFromPageTop)}px`,
            animationFillMode: "forwards",
            maxWidth: 400,
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

      if (servicesRef.current.getBoundingClientRect().top < 100) {
        gsap.to(cardsContainerRef.current, {
          transform: "scale(1)",
          animationFillMode: "forwards",
        });
      } else {
        gsap.to(cardsContainerRef.current, {
          transform: "scale(0)",
          animationFillMode: "forwards",
        });
      }
    }
  };

  VanillaTilt.init(
    document.querySelectorAll(`.${css.card}`) as unknown as HTMLDivElement[],
    {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 2.5,
    }
  );

  useEffect(() => {
    if (appRef.current)
      appRef.current.addEventListener("scroll", handleScrollAnimation);

    return () => {
      if (appRef.current)
        appRef.current.removeEventListener("scroll", handleScrollAnimation);
    };
  }, [appRef, appRef.current]);

  return (
    <div className={css.services} id="services" ref={servicesRef}>
      <div className={css.heading}>
        <h1 className="service-h1">Our Services</h1>
        <div className={css.line}></div>
      </div>
      <img src={blob} alt="" ref={blobRef} className={css.blob} />
      <div className={css.body}>
        <div className={css.left}>
          <Rive src="/woman_on_phone.riv" />
        </div>
        <div
          className={css.right}
          ref={cardsContainerRef}
          style={{ padding: 0, overflow: "inherit" }}
        >
          <Slider {...settings}>
            {serviceCards.map((eachService, i) => (
              <Card
                service={eachService}
                cardsContainerRef={cardsContainerRef}
                key={i}
              />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

const Card: FC<{
  service: SeriviceCard;
  cardsContainerRef: React.RefObject<HTMLDivElement>;
}> = ({ service, cardsContainerRef }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className={css.card} ref={cardRef}>
      <div
        className={css["img-container"]}
        style={{ background: service.color }}
      >
        <img src={service.image} alt="" style={service.imgPosition} />
      </div>
      <div className={css.content}>
        {service?.priceList?.map((eachItem) => (
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
        {service?.randomList?.map((eachItem) => (
          <>
            <li>{eachItem}</li>
          </>
        ))}
      </div>
    </div>
  );
};

export default Services;
