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
              `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab est atque
          blanditiis at culpa consectetur totam, dolorum officiis hic nobis sit
          impedit maiores porro pariatur esse! Suscipit provident minus placeat
          quia blanditiis ipsam atque amet est, obcaecati, temporibus quos
          dolores voluptas accusamus architecto! Possimus aliquam adipisci
          impedit deleniti. Ipsa, minus accusamus! Officia sunt similique
          architecto maxime debitis. Beatae illo exercitationem officia?
          Recusandae soluta sed atque nobis iure, impedit totam placeat,
          architecto aspernatur sint nesciunt perspiciatis! Assumenda molestias
          enim exercitationem in earum numquam omnis sapiente, sequi repudiandae
          possimus praesentium, sed, corporis quo accusamus vel illo neque! Nam
          excepturi exercitationem enim hic pariatur? Obcaecati voluptatum
          itaque excepturi mollitia voluptates quos, nemo odit error qui,
          incidunt consequatur dolor molestiae dicta explicabo voluptate dolorem
          quaerat, illo nostrum consequuntur? Vero accusamus, repellendus
          blanditiis laboriosam, asperiores porro ab rem fugit atque voluptatum
          perspiciatis quisquam ipsum soluta! Natus quod facere commodi
          similique atque! Temporibus quas voluptatem optio eos, voluptas
          fugiat? Sunt quos suscipit fuga est repellat vitae, veniam molestias
          quis. Placeat sit a obcaecati expedita velit soluta est, optio ullam
          magnam inventore aliquam culpa beatae necessitatibus commodi totam
          officiis ea unde nam nisi impedit accusamus! Delectus quae et, alias
          quaerat ex modi culpa id dicta quia temporibus nemo commodi, at qui
          distinctio? Exercitationem tempora atque officia, ut esse, beatae
          possimus aliquid dicta iure rerum quisquam reprehenderit velit vitae
          ipsum. Architecto porro iusto optio, ab expedita fugit molestiae illo,
          eos dolor officia corporis, voluptatem quaerat iste beatae totam esse
          quod tenetur doloribus repudiandae necessitatibus? Totam, animi
          dignissimos? Dignissimos?`,
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
