import React from "react";
import classes from "./Account.module.css";
import Input from "../Input/Input";
import BtnLoadingIndicator from "../UI/BtnLoadingIndiacator/BtnLoadingIndicator";

const Account = (props) => {
  return (
    <div className={classes.Account}>
      <div className={classes.Image}>
        <div className={classes.ProgressBar}>
          <svg
            viewport="0 0 100 100"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: props.progress ? "block" : "none" }}
          >
            <circle
              r="28"
              cx="30"
              cy="30"
              fill="transparent"
              strokeDasharray="188.4"
              strokeDashoffset="0"
            ></circle>
            <circle
              style={{ strokeDashoffset: props.progress }}
              className={classes.Bar}
              r="28"
              cx="30"
              cy="30"
              fill="transparent"
              strokeDasharray="188.4"
              strokeDashoffset="0"
            ></circle>
          </svg>
        </div>
        <input
          type="file"
          onChange={props.uploadPhotoHanlder}
          accept="image/*"
        />
        <img src={props.photoUrl} alt="profilePic" />
      </div>
      <div className={classes.Input}>
        <Input
          index={props.index}
          name={props.inputElems.username.name}
          placeholder={props.inputElems.username.placeholder}
          value={props.inputElems.username.value}
          type={props.inputElems.username.type}
          isValid={props.inputElems.username.isValid}
          touched={props.inputElems.username.touched}
          changed={props.changed}
          errMsg={props.inputElems.username.errMsg}
          onUsernameNotAvailable={props.onUsernameNotAvailable}
        />
        <button
          className={classes.UpdateBtn}
          type="button"
          onClick={props.updateUsername}
        >
          {props.updateBtnLoading ? <BtnLoadingIndicator /> : "Update Username"}
        </button>
        <button className={classes.LogOutBtn} onClick={props.logOut}>Log out</button>
      </div>
    </div>
  );
};

export default Account;
