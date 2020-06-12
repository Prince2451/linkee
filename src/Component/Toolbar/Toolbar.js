import React from "react";
import classes from "./Toolbar.module.css";
import { NavLink, Link } from "react-router-dom";
const Toolbar = (props) => {
  if (props.username) {
  }
  return (
    <div className={classes.Toolbar}>
      <div className={classes.Container}>
        <NavLink exact activeClassName={classes.ActiveLink} to="/admin">
          Links
        </NavLink>
        <NavLink activeClassName={classes.ActiveLink} to="/admin/settings">
          Settings
        </NavLink>
        {props.view ? (
          <NavLink activeClassName={classes.ActiveLink} to="/admin/view">
            View
          </NavLink>
        ) : null}
      </div>
      <div className={classes.LinkContainer}>
        <p>
          My Bio Links:{" "}
          <Link to={`/${props.username}`}>
            https://linkee.com/{props.username}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Toolbar;
