import React from "react";
import classes from "./Logo.module.css";
import logo from "../../../assets/logo.png";
const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <div className={classes.Container} >
        <img src={logo} alt="logo" />
        <img src={logo} alt="logo" />
        <img src={logo} alt="logo" />
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default Logo;
