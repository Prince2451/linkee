import React from "react";
import classes from "./Content.module.css";
import Logo from "../UI/Logo/Logo";
const Content = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.LogoContainer} ref={props.imageRef}>
        <Logo />
      </div>
      <div className={classes.Content}>
        <h1>linkee</h1>
        <h3>One link for All your links!</h3>
      </div>
      <div className={classes.Features}>
        <div className={classes.Content}>
          <h3>one link for multiple platforms!</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris
          </p>
        </div>
        <div className={classes.Video}>
          <video alt="video"></video>
        </div>
      </div>
    </div>
  );
};

export default Content;
