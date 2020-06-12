import React, { useEffect } from "react";
import classes from "./Input.module.css";
import firebase from "../../Firebase";
const Input = (props) => {
  let usernameInput = null;
  const setUsernameField = (ele) => {
    usernameInput = ele;
  };
  useEffect(() => {
    let timeout;
    if (props.name === "username" && props.isValid) {
      timeout = setTimeout(() => {
        if (props.value === usernameInput.value) {
          firebase
            .firestore()
            .collection("users")
            .where("username", "==", props.value)
            .get()
            .then((res) => {
              if (!res.empty) {
                props.onUsernameNotAvailable(props.value);
              }
            });
        }
      }, 700);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [props,usernameInput]);
  let style = null;
  let errMsg = null;
  if (props.touched) {
    if (!props.isValid) {
      style = classes.Red;
      errMsg = <span className={classes.ErrMsg}>{props.errMsg}</span>;
      if(props.isInLinkCard){
        style = classes.LinkCardRed;
        errMsg = null;
      }
    } else {
      style = classes.Green;
      if(props.isInLinkCard){
        style = null;
        errMsg = null;
      }
    }
  }
  return (
    <>
      <div className={classes.Field}>
        <input
          type={props.type}
          ref={props.name === "username" ? setUsernameField : null}
          name={props.name}
          className={props.isInLinkCard?[classes.LinkCardField,style].join(' '):[classes.Input, style].join(" ")}
          placeholder={props.placeholder}
          onChange={(e) => props.changed(e,props.outerId)}
          value={props.value}
          onBlur={props.onblur || null}
        />
        {errMsg}
      </div>
    </>
  );
};

export default Input;
