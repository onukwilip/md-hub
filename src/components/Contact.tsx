import React from "react";
import css from "../styles/Contact.module.scss";
import bg from "../assets/img/potential-bg-2.png";

const Contact: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = () => {
  return (
    <div className={css.contact}>
      <div className={css.heading}>
        <h1 className="h1">Contact us</h1>
        <div className={css.line}></div>
      </div>
      <div className={css["bg-wrapper"]}>
        <img src={bg} className={css.bg} alt="" />
      </div>
    </div>
  );
};

export default Contact;
