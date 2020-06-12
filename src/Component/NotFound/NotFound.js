import React from "react";
import classes from './NotFound.module.css';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={classes.NotFound}>
      <h1>404</h1>
      <h2>Not Found</h2>
      <p>The page you are looking for does not exist</p>
      <span>Back to</span>
      <Link to="/home">home</Link>
    </div>
  );
};

export default NotFound;
