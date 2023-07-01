import React, { FC, useEffect, useRef } from "react";
import css from "../styles/Contact.module.scss";
import bg from "../assets/img/potential-bg-2.png";
import { ContactListClass } from "../utils";
import Input from "./Input";
import { Form } from "semantic-ui-react";
import { useInput } from "use-manage-form";
import { gsap } from "gsap";

const contactsList = [
  new ContactListClass(
    "fas fa-location-dot",
    "Address",
    "123 some street some address"
  ),
  new ContactListClass("fas fa-phone", "Phone", "+234 9160951173"),
  new ContactListClass(
    "fa-regular fa-paper-plane",
    "E-mail",
    "nnamelemanassel@gmail.com"
  ),
  new ContactListClass(
    "fa-solid fa-earth-americas",
    "Website",
    "www.example.com"
  ),
];

const Contact: React.FC<{ appRef: React.RefObject<HTMLDivElement> }> = ({
  appRef,
}) => {
  const contactRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  const {
    value: name,
    isValid: nameIsValid,
    inputIsInValid: nameInputIsInvalid,
    onChange: onNameChange,
    onBlur: onNameBlur,
    reset: resetName,
  } = useInput<string>((value) => value?.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    inputIsInValid: emailInputIsInvalid,
    onChange: onEmailChange,
    onBlur: onEmailBlur,
    reset: resetEmail,
  } = useInput<string>((value) => value?.includes("@") || false);

  const {
    value: sublect,
    isValid: sublectIsValid,
    inputIsInValid: sublectInputIsInvalid,
    onChange: onSublectChange,
    onBlur: onSublectBlur,
    reset: resetSublect,
  } = useInput<string>((value) => value?.trim() !== "");

  const {
    value: description,
    isValid: descriptionIsValid,
    inputIsInValid: descriptionInputIsInvalid,
    onChange: onDescriptionChange,
    onBlur: onDescriptionBlur,
    reset: resetDescription,
  } = useInput<string>((value) => value?.trim() !== "");

  const handleScrollAnimation = (e: Event) => {
    if (contactRef.current && rightSideRef.current) {
      const distanceFromPageTop =
        contactRef.current.getBoundingClientRect().top;

      gsap.from(`.contact-h1`, {
        transform: `translateX(${-distanceFromPageTop * 0.25}px)`,
        animationFillMode: "forwards",
        ease: "power.out",
      });

      gsap.to(`.${css["line-child"]}`, {
        width: `${Math.max(0, 610 - distanceFromPageTop)}px`,
        animationFillMode: "forwards",
        ease: "power.out",
        duration: 0.2,
      });

      gsap.to(`.img-bg`, {
        transform: `translateY(-${distanceFromPageTop * 0.3}px)`,
        animationFillMode: "forwards",
        ease: "power.out",
        duration: 0.2,
      });

      const contactList = document.getElementsByClassName(
        ".contact-list"
      ) as HTMLCollectionOf<HTMLDivElement>;
      Array.from(contactList[0].children).forEach((contact, i) => {
        gsap.to(contact, {
          x: `-${distanceFromPageTop * 0.15}px`,
          animationFillMode: "forwards",
          delay: i * 0.3,
          duration: 0.1,
          opacity: `${Math.min(
            Math.max(0, 1 - distanceFromPageTop / window.innerHeight),
            1
          )}`,
        });
      });

      const elementRect = contactRef.current.getBoundingClientRect();
      const windowCenter = window.innerHeight / 2;
      const elementCenter = elementRect.top + elementRect.height / 2;

      const distance = Math.abs(windowCenter - elementCenter);
      const maxDistance = window.innerHeight / 2;
      const scale = 1 - Math.min(distance / maxDistance, 1);

      if (elementRect.top > -150) {
        gsap.to(`.${css.form}`, {
          transform: `scale(${scale})`,
          animationFillMode: "forwards",
          ease: "power.out",
          duration: 0.9,
        });
      }
      if (window.innerHeight <= 900) {
        if (elementRect.top < 70) {
          gsap.to(`.${css.form}`, {
            transform: `scale(${1})`,
            animationFillMode: "forwards",
            ease: "power.out",
            duration: 0.9,
          });
        } else {
          gsap.to(`.${css.form}`, {
            transform: `scale(${0})`,
            animationFillMode: "forwards",
            ease: "power.out",
            duration: 0.9,
          });
        }
      }
    }
  };

  useEffect(() => {
    console.log("Form", rightSideRef.current);
    if (appRef.current)
      appRef.current.addEventListener("scroll", handleScrollAnimation);

    return () => {
      if (appRef.current)
        appRef.current.removeEventListener("scroll", handleScrollAnimation);
    };
  }, [appRef, appRef.current]);

  return (
    <div className={css.contact} ref={contactRef} id="contact">
      <div className={css.heading}>
        <h1 className="contact-h1">Contact us</h1>
        <div className={css.line}>
          <div className={css["line-child"]}></div>
        </div>
      </div>
      <div className={css["bg-wrapper"]}>
        <img src={bg} className={"img-bg"} alt="" />
      </div>
      <div className={css.body}>
        <div className={css.left}>
          <div className=".contact-list">
            {contactsList.map((eachContact, i) => (
              <>
                <EachContactList contact={eachContact} key={i} />
              </>
            ))}
          </div>
        </div>
        <div className={css.right} ref={rightSideRef}>
          <Form className={css.form}>
            <Input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              onBlur={onNameBlur as any}
              name="name"
              placeholder="Enter name"
              id="name"
              icon="fas fa-user"
              type="text"
            />
            <Input
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onBlur={onEmailBlur as any}
              name="email"
              placeholder="Enter email"
              id="email"
              icon="fa-solid fa-envelopes-bulk"
              type="email"
            />
            <Input
              value={sublect}
              onChange={(e) => onSublectChange(e.target.value)}
              onBlur={onSublectBlur as any}
              name="subject"
              placeholder="Enter subject"
              id="subject"
              icon="fa-solid fa-envelope-open-text"
              type="text"
            />
            <div className={css["description-container"]}>
              <label htmlFor="description">Description</label>
              <textarea
                placeholder="Enter description"
                className={css.description}
                id="description"
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                onBlur={onDescriptionBlur as any}
                style={{ minHeight: 100 }}
              />
            </div>
            <div className={css.actions}>
              <button>Send</button>
              <button>Reset</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

export const EachContactList: FC<{ contact: ContactListClass }> = ({
  contact,
}) => {
  return (
    <div className={css["each-contact"]}>
      <i className={contact.icon}></i>
      <span className={css["content"]}>
        <span>{contact.name}</span>
        <span>{contact.descrption}</span>
      </span>
    </div>
  );
};
