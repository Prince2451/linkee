import React from "react";
import classes from "./BtnLoadingIndicator.module.css";
const BtnLoadingIndicator = (props) => {
  return (
    <div className={classes.Container}>
      <div>
        <span className={classes.Span1}>.</span>
        <span className={classes.Span2}>.</span>
        <span className={classes.Span3}>.</span>
      </div>
    </div>
  );
};

export default BtnLoadingIndicator;
