import React from "react";
import classes from "./AuthenticateDialog.module.css";
import Backdroop from "../UI/Backdrop/Backdrop";
import Input from "../Input/Input";
import googleLogo from "../../assets/G_logo.png";
import BtnLoadingIndicator from "../UI/BtnLoadingIndiacator/BtnLoadingIndicator";
const AuthenticateDialog = (props) => {
  let inputs = [];
  let userDialog = (
    <>
      <Input
        errMsg={props.inputElems.username.errMsg}
        key="username"
        name={props.inputElems.username.name}
        placeholder={props.inputElems.username.placeholder}
        value={props.inputElems.username.value}
        type={props.inputElems.username.type}
        changed={props.changed}
        isValid={props.inputElems.username.isValid}
        touched={props.inputElems.username.touched}
        onUsernameNotAvailable={props.onUsernameNotAvailable}
      />
      <button className={classes.SubmitBtn} onClick={props.setUsernameHandler} type="button">
        {props.setUsernameBtnLoading?<BtnLoadingIndicator />:'Set username'}
      </button>
    </>
  );
  let bottomContent = (
    <>
      <button className={classes.SubmitBtn} type="submit">
        {props.btnLoading ? <BtnLoadingIndicator /> : "Sign Up"}
      </button>
      <p className={[classes.Text, classes.Block].join(" ")}>or Sign in with</p>
      <button
        className={classes.GoogleBtn}
        onClick={props.googleSignin}
        type="button"
      >
        <img className={classes.GoogleLogo} src={googleLogo} alt="googleLogo" />
        <span>
          {props.showGoogleBtnLoading ? <BtnLoadingIndicator /> : "Google"}
        </span>
      </button>
      <p className={classes.Text}>
        Already Registered!
        <button
          className={classes.ChangeMode}
          onClick={props.changeMode}
          type="button"
        >
          Sign in
        </button>{" "}
        instead
      </p>
    </>
  );
  if (props.signin) {
    bottomContent = (
      <>
        <button className={classes.SubmitBtn} type="submit">
          {" "}
          {props.btnLoading ? <BtnLoadingIndicator /> : "Sign In"}
        </button>
        <p className={[classes.Text, classes.Block].join(" ")}>
          or Sign in with
        </p>
        <button
          className={classes.GoogleBtn}
          onClick={props.googleSignin}
          type="button"
        >
          <img
            className={classes.GoogleLogo}
            src={googleLogo}
            alt="googleLogo"
          />
          {props.showGoogleBtnLoading ? (
            <BtnLoadingIndicator />
          ) : (
            <span>Google</span>
          )}
        </button>
        <p className={classes.Text}>
          Not Registered!
          <button
            className={classes.ChangeMode}
            onClick={props.changeMode}
            type="button"
          >
            Sign up
          </button>{" "}
          instead
        </p>
      </>
    );
  }
  for (let inputEle in props.inputElems) {
    if (props.signin) {
      if (inputEle === "username") {
        continue;
      }
    }
    inputs.push(
      <Input
        errMsg={props.inputElems[inputEle].errMsg}
        key={inputEle}
        name={props.inputElems[inputEle].name}
        placeholder={props.inputElems[inputEle].placeholder}
        value={props.inputElems[inputEle].value}
        type={props.inputElems[inputEle].type}
        changed={props.changed}
        onUsernameNotAvailable={props.onUsernameNotAvailable}
        isValid={props.inputElems[inputEle].isValid}
        touched={props.inputElems[inputEle].touched}
      />
    );
  }
  return (
    <>
      <div className={classes.Dialog}>
        <div className={classes.Container}>
          <svg
            className={classes.User}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </div>
        <form className={classes.Form} onSubmit={props.submitted}>
          {props.userDialog ? (
            userDialog
          ) : (
            <>
              {inputs} {bottomContent}
            </>
          )}
        </form>
      </div>
      <Backdroop clicked={props.clicked} />
    </>
  );
};
export default AuthenticateDialog;
