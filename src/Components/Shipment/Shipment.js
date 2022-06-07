import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useContext } from "react";
import { UserContext } from "../../App";
import HappyPhoto from "../../images/giphy.gif";
import { Link } from "react-router-dom";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  // const onSubmit = (data) => {
  //   console.log("form submitted", data);
  // };
  //onSubmit={handleSubmit(onSubmit)}

  return (
    <>
      {!formSubmitted ? (
        <form className="ship-form">
          <input
            name="name"
            defaultValue={loggedInUser.name}
            ref={register({ required: true })}
            placeholder="Your Name"
          />
          {errors.name && <span className="error">Name is required</span>}
          <input
            name="email"
            defaultValue={loggedInUser.email}
            ref={register({ required: true })}
            placeholder="Your Email"
          />
          {errors.email && <span className="error">Email is required</span>}
          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your Address"
          />
          {errors.address && <span className="error">Address is required</span>}
          <input
            name="phone"
            ref={register({ required: true })}
            placeholder="Your Phone Number"
          />
          {errors.phone && (
            <span className="error">Phone Number is required</span>
          )}
          <button
            onClick={() => setFormSubmitted(true)}
            className="shipment-button"
            type="submit"
          >
            SUBMIT
          </button>
        </form>
      ) : (
        <img
          className="success-gif"
          src="https://media3.giphy.com/media/a0h7sAqON67nO/giphy.gif"
          alt=""
        />
      )}
    </>
  );
};

export default Shipment;
