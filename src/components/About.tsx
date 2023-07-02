import React, { useRef, useEffect } from "react";
import css from "../styles/About.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { QMark } from "./QMark";
import { QMark1 } from "./QMark1";
import { QMarkAnil } from "./QMarkAnil";
import { Object3D } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { gsap } from "gsap";
import { TypeAnimation } from "react-type-animation";

const About: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleScrollAnimation = (e: Event) => {
    if (aboutRef.current) {
      const distanceFromTop = aboutRef?.current?.getBoundingClientRect().top;

      gsap.from(`.landing-h1`, {
        transform: `translateX(${distanceFromTop * 0.25}px)`,
        animationFillMode: "forwards",
        ease: "power.out",
      });
      gsap.to(`.${css.line}`, {
        width: `${Math.max(0, 600 - distanceFromTop)}px`,
        animationFillMode: "forwards",
        ease: "power.out",
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
    <div className={css.about} ref={aboutRef} id="about">
      <div className={css.left}>
        <div className={css.heading}>
          <h1 className="landing-h1">About Us</h1>
          <div className={css.line}></div>
        </div>
        <br />
        <blockquote>
          <TypeAnimation
            sequence={[
              `Welcome to Manassel Data Hub, your one-stop destination for convenient services. We provide recharge cards, data sales, result checker pins, airtime-to-cash conversion, electricity bill payments, and cable subscriptions. Our printing services ensure you're always connected with recharge cards for calls, texts, and data. Stay connected in the digital age with our reliable and affordable data plans for browsing and streaming. Easily access and verify examination results through our platform. Convert excess airtime to cash securely and conveniently. Settle utility bills without long queues or complications. Enjoy a wide range of entertainment options with our cable subscription services. Our dedicated professionals prioritize customer satisfaction and efficiency. Experience the convenience of Manassel Data Hub today for all your telecommunications and utility needs.`,
            ]}
            speed={90}
          />
        </blockquote>
      </div>
      <div className={css.right} tabIndex={5}>
        <Canvas>
          <QuestionScene />
        </Canvas>
      </div>
    </div>
  );
};

const QuestionScene = () => {
  const toRadians = (deg: number) => (Math.PI / 180) * deg;
  const objRef = useRef<Object3D<Event>>(null);
  const orbitCntrlRef = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    // objRef.current?.rotateX(0.001);
    // objRef.current?.rotateZ(0.001);
    objRef.current?.rotateY(0.001);

    orbitCntrlRef.current?.update();
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 1.5]} />
      <OrbitControls
        enableZoom={false}
        ref={orbitCntrlRef}
        maxAzimuthAngle={toRadians(30)}
        minAzimuthAngle={toRadians(-20)}
        maxPolarAngle={toRadians(100)}
        minPolarAngle={toRadians(60)}
      />
      <object3D ref={objRef}>
        <QMarkAnil position={[0, 0, 0.2]} scale={1} />
        <QMark position={[-0.4, -0.3, 0.2]} scale={0.03} />
        <QMark1
          position={[-0.01, 0.1, 0.2]}
          rotation={[0, toRadians(180), 0]}
          scale={0.0005}
        />
      </object3D>

      <ambientLight args={["white", 1]} />
      <pointLight position={[0, 0, 0]} args={["white", 1]} />
      <directionalLight position={[-1, 1, 2]} args={["white", 1]} />
    </>
  );
};

export default About;
