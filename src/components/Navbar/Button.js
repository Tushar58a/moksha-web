/* eslint-disable react/prop-types */
import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--line", "btn--test"];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({ children, type, onClick, buttonStyle, buttonSize, redirect }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <Link to={redirect} className="btn-mobile">
      <button
        className={`btn1 ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
