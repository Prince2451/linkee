import React from "react";
import Backdrop from "../UI/Backdrop/Backdrop";
import classes from "./Menu.module.css";
const Menu = (props) => {
  let style = [classes.Menu, classes.Show].join(" ");
  if (!props.show) {
    style = [classes.Menu, classes.Hide].join(" ");
  }
  return (
    <div className={classes.Container}>
      <div onClick={props.toggleMenuHandler} className={classes.MenuBtn}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={style}>
        <div className={classes.MenuContent}>{props.children}</div>
      </div>
      {props.show ? <Backdrop transparent clicked={props.clicked} /> : null}
    </div>
  );
};

export default Menu;
