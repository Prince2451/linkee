import React, { Component } from "react";
import classes from "./Home.module.css";
import { Route, withRouter, Redirect } from "react-router-dom";
import firebase from "../../Firebase";
import Navbar from "..//Navbar/Navbar";
import Content from "../../Component/Content/Content";
import AuthenticateDialog from "../../Component/AuthenticateDialog/AuthenticateDialog";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actionCreators/actionCreators";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputElems: {
        username: {
          type: "text",
          name: "username",
          placeholder: "Username",
          requiredPattern: "username should be valid",
          eleConfig: {
            required: true,
            pattern: /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,10}[a-zA-Z0-9]$/,
            minLength: 6,
            maxLength: 12,
          },
          isValid: false,
          touched: false,
          errMsg: "",
          value: "",
        },
        emailId: {
          type: "text",
          name: "emailId",
          placeholder: "Email Id",
          requiredPattern: "Email Required",
          eleConfig: {
            required: true,
            pattern: /^([a-zA-Z0-9_-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
          },
          isValid: false,
          touched: false,
          errMsg: "",
          value: "",
        },
        password: {
          type: "password",
          name: "password",
          placeholder: "Password",
          eleConfig: {
            required: true,
            minLength: 6,
          },
          isValid: false,
          touched: false,
          errMsg: "",
          value: "",
        },
      },
      showGoogleBtnLoading: false,
      signupBtnLoading: false,
      signinBtnLoading: false,
      processing: false,
      usernameNotAdded: false,
      setUsernameBtnLoading: false,
    };
    this.image = null;
    this.setImage = (element) => {
      this.image = element;
    };
    this.bgImageScroll = (e) => {
      this.image.style.opacity = `${
        window.scrollY > 100 ? 0 : 1 - window.scrollY / 150
      }`;
      document.body.style.backgroundPositionY = `-${window.scrollY / 3}px`;
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.bgImageScroll);
    let cameAfterGoogleRedirection =
      window.localStorage.getItem("redirectedWithGoogle") || null;
    if (cameAfterGoogleRedirection === "true") {
      this.props.updateSigningWithGoogle(true);
      window.localStorage.setItem("redirectedWithGoogle", false);
      this.setState({
        showGoogleBtnLoading: true,
        processing: true,
      });
    }
    firebase
      .auth()
      .getRedirectResult()
      .catch((err) => {
        let errMsg;
        if (err.code === "auth/network-request-failed") {
          errMsg = "Network Error";
        } else {
          errMsg = "Something went wrong";
        }
        this.props.updateResponse(errMsg, true, true);
      })
      .finally(() => {
        if (this.state.showGoogleBtnLoading) {
          this.setState({ showGoogleBtnLoading: false, processing: false });
        }
      });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.bgImageScroll);
  }
  resetInputs() {
    let cleanInputs = {
      username: {
        ...this.state.inputElems.username,
        isValid: false,
        touched: false,
        errMsg: "",
        value: "",
      },
      emailId: {
        ...this.state.inputElems.emailId,
        isValid: false,
        touched: false,
        errMsg: "",
        value: "",
      },
      password: {
        ...this.state.inputElems.password,
        isValid: false,
        touched: false,
        errMsg: "",
        value: "",
      },
    };
    this.setState({
      inputElems: {
        ...cleanInputs,
      },
    });
  }
  setUsernameHandler = (e) => {
    let username = this.state.inputElems.username.value;
    if (this.state.inputElems.username.isValid) {
      this.setState({
        setUsernameBtnLoading: true,
      });
      this.createUserAtDB(
        this.props.userId,
        this.state.inputElems.username.value
      )
        .then((res) => {
          if (res) {
            this.props.updateSigningWithGoogle(false);
            this.props.updateShowUserDialog(false);
            this.props.updateLoggedInStatus(true);
            this.props.updateUserDetails(
              this.props.userId,
              this.props.photoUrl,
              username
            );
          } else {
            this.setState({
              setUsernameBtnLoading: false,
            });
          }
        })
        .catch((err) => {
          this.setState({
            setUsernameBtnLoading: false,
          });
          let errMsg;
          if (err.code === "auth/network-request-failed") {
            errMsg = "Network Error";
          } else {
            errMsg = "Something went wrong";
          }
          this.props.updateResponse(errMsg, true, true);
        });
    } else {
      if (!this.state.inputElems.username.touched) {
        this.setState({
          inputElems: {
            ...this.state.inputElems,
            username: {
              ...this.state.inputElems.username,
              touched: true,
              errMsg: "field required",
            },
          },
        });
      }
    }
  };
  removeDialogHandler = (e) => {
    this.setState();
    this.props.history.push("/home");
  };
  signupBtnHandler = (e) => {
    this.resetInputs();
    this.props.history.push("/home/signup");
  };
  signinBtnHandler = (e) => {
    this.resetInputs();
    this.props.history.push("/home/signin");
  };
  checkValidity(ele) {
    let element = {
      ...this.state.inputElems[ele.name],
    };
    let isValid = true;
    let errMsg = null;
    if (element.eleConfig) {
      if (element.eleConfig.pattern) {
        isValid = element.eleConfig.pattern.test(ele.value.trim()) && isValid;
        errMsg = element.eleConfig.pattern.test(ele.value.trim())
          ? errMsg
          : element.requiredPattern;
      }
      if (element.eleConfig.minLength) {
        isValid = ele.value.length >= element.eleConfig.minLength && isValid;
        errMsg =
          ele.value.length >= element.eleConfig.minLength
            ? errMsg
            : "Minimum length is " + element.eleConfig.minLength;
      }
      if (ele.value.length > element.eleConfig.maxLength) {
        ele.value = ele.value.substring(0, ele.value.length - 1);
      }
      if (element.eleConfig.required) {
        isValid = ele.value.trim() && isValid;
        errMsg = ele.value.trim() ? errMsg : "field required";
      }
    }
    element.isValid = isValid;
    element.errMsg = errMsg;
    element.touched = true;
    return element;
  }
  updateValueHandler = (e) => {
    let eleObject = this.checkValidity(e.target);
    this.setState({
      inputElems: {
        ...this.state.inputElems,
        [e.target.name]: {
          ...eleObject,
          value: e.target.value.trim(),
        },
      },
    });
  };
  formValidationChecker(operation) {
    let isFormValid = false;
    for (let ele in this.state.inputElems) {
      if (operation === "signin" && ele === "username") {
        continue;
      }
      if (!this.state.inputElems[ele].isValid) {
        this.setState({
          inputElems: {
            ...this.state.inputElems,
            [ele]: {
              ...this.state.inputElems[ele],
              errMsg: this.state.inputElems[ele].errMsg
                ? this.state.inputElems[ele].errMsg
                : "field required",
            },
          },
        });
        isFormValid = false;
        break;
      }
      isFormValid = true;
    }
    return isFormValid;
  }
  onSignupHandler = (e) => {
    e.preventDefault();
    if (this.state.processing) {
      return;
    }
    const isFormValid = this.formValidationChecker("signup");
    if (isFormValid) {
      this.setState({ signupBtnLoading: true, processing: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.inputElems.emailId.value,
          this.state.inputElems.password.value
        )
        .then((res) => {
          return this.createUserAtDB(
            res.user.uid,
            this.state.inputElems.username.value
          ).then((result) => {
            this.resetInputs();
            if (result) {
              return res.user
                .sendEmailVerification({
                  url: "http://localhost:3000/signin",
                })
                .catch((err) => {
                  let errMsg;
                  if (err.code === "auth/network-request-failed") {
                    errMsg = "Network Error";
                  } else if (
                    err.code === "auth/email-already-exists" ||
                    err.code === "auth/email-already-in-use"
                  ) {
                    errMsg = "Email already exist";
                  } else {
                    errMsg = "Something went wrong";
                  }
                  this.props.updateResponse(errMsg, true, true);
                });
            }
          });
        })
        .then((res) => {
          this.props.updateResponse("Email sent", false, true);
        })
        .catch((err) => {
          let errMsg;
          if (err.code === "auth/network-request-failed") {
            errMsg = "Network Error";
          } else if (
            err.code === "auth/email-already-exists" ||
            err.code === "auth/email-already-in-use"
          ) {
            errMsg = "Email already exist";
          } else {
            errMsg = "Something went wrong";
          }
          this.props.updateResponse(errMsg, true, true);
        })
        .finally(() => {
          this.setState({
            signupBtnLoading: false,
            processing: false,
          });
          firebase.auth().signOut();
        });
    }
  };
  onSigninHandler = (e) => {
    e.preventDefault();
    if (this.state.processing) {
      return;
    }
    const isFormValid = this.formValidationChecker("signin");
    if (isFormValid) {
      this.setState({ signinBtnLoading: true, processing: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(
          this.state.inputElems.emailId.value,
          this.state.inputElems.password.value
        )
        .then((res) => {
          if (res.user) {
            if (!res.user.emailVerified) {
              throw Error("Please verify your email");
            }
          }
        })
        .catch((err) => {
          let errMsg;
          if (err.message === "Please verify your email") {
            errMsg = err.message;
          } else if (err.code === "auth/network-request-failed") {
            errMsg = "Network Error";
          } else if (
            err.code === "auth/email-already-exists" ||
            err.code === "auth/email-already-in-use"
          ) {
            errMsg = "Email already exist";
          } else if (err.code === "auth/user-not-found") {
            errMsg = "Email doesn't exist";
          } else if (err.code === "auth/wrong-password") {
            errMsg = "Password Mismatch";
          } else {
            errMsg = "Something went wrong";
          }
          firebase.auth().signOut();
          this.setState({
            signinBtnLoading: false,
            processing: false,
          });
          this.props.updateResponse(errMsg, true, true);
        });
    }
  };
  async createUserAtDB(userId, username) {
    let res = await firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .get();
    if (!res.empty) {
      this.setState({
        inputElems: {
          ...this.state.inputElems,
          username: {
            ...this.state.inputElems.username,
            isValid: false,
            touched: true,
            errMsg: "username not available",
          },
        },
      });
      return null;
    } else {
      firebase
        .firestore()
        .doc("users/" + userId)
        .set({
          username: username,
          background: {
            backgroundType: "Color",
            backgroundImage: "",
            primaryColor: "#ffffff",
            secondaryColor: "#ffffff",
            backgroundColor: "#ffffff",
            textColor: "#ffffff",
            gradientDirection: "to right",
          },
          button: {
            buttonType: "Solid",
          },
          links: [],
          currentMaxId: 0,
        });
    }
    return res;
  }
  googleSigninHandler = (e) => {
    if (this.state.processing) {
      return;
    }
    this.setState({ showGoogleBtnLoading: true, processing: true });
    let provider = new firebase.auth.GoogleAuthProvider();

    if (window.outerWidth >= 800) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          if (res.user) {
            return firebase
              .firestore()
              .doc("users/" + res.user.uid)
              .get();
          }
          return null;
        })
        .then((res) => {
          if (res) {
            if (!res.exists) {
              this.props.updateSigningWithGoogle(true);
              this.props.updateShowUserDialog(true);
            } else if (res.exists) {
              this.props.updateLoggedInStatus(true);
            }
          }
        })
        .catch((err) => {
          let errMsg;
          if (err.code === "auth/network-request-failed") {
            errMsg = "Network Error";
          } else {
            errMsg = "Something went wrong";
          }
          this.props.updateResponse(errMsg, true, true);
        })
        .finally(() => {
          if (this.state.showGoogleBtnLoading) {
            this.setState({ showGoogleBtnLoading: false, processing: false });
          }
        });
    } else {
      window.localStorage.setItem("redirectedWithGoogle", true);
      firebase
        .auth()
        .signInWithRedirect(provider)
        .catch((err) => {
          let errMsg;
          if (err.code === "auth/network-request-failed") {
            errMsg = "Network Error";
          } else {
            errMsg = "Something went wrong";
          }
          this.props.updateResponse(errMsg, true, true);
          window.localStorage.setItem("redirectedWithGoogle", false);
          this.setState({ showGoogleBtnLoading: false, processing: false });
        });
    }
  };
  onUsernameNotAvailable = (e) => {
    this.setState({
      inputElems: {
        ...this.state.inputElems,
        username: {
          ...this.state.inputElems.username,
          isValid: false,
          errMsg: "username not available",
        },
      },
    });
  };
  render() {
    let redirect = null;
    if (this.props.usernameNotAdded) {
      redirect = <Redirect to="/home/signup" />;
    }
    if (this.props.loggedIn) {
      redirect = <Redirect to="/admin" />;
    }

    return (
      <>
        {redirect}
        <Navbar>
          <div className={classes.BtnContainer}>
            <button className={classes.Signup} onClick={this.signupBtnHandler}>
              Sign Up
            </button>
            <button className={classes.Signin} onClick={this.signinBtnHandler}>
              Sign In
            </button>
          </div>
        </Navbar>
        <main>
          <Content imageRef={this.setImage} />
          <Route path="/home/signup" exact>
            <AuthenticateDialog
              signup
              onUsernameNotAvailable={this.onUsernameNotAvailable}
              setUsernameBtnLoading={this.state.setUsernameBtnLoading}
              setUsernameHandler={this.setUsernameHandler}
              userDialog={this.props.usernameNotAdded}
              showGoogleBtnLoading={this.state.showGoogleBtnLoading}
              googleSignin={this.googleSigninHandler}
              submitted={this.onSignupHandler}
              inputElems={this.state.inputElems}
              clicked={this.removeDialogHandler}
              changed={this.updateValueHandler}
              changeMode={this.signinBtnHandler}
              btnLoading={this.state.signupBtnLoading}
            />
          </Route>
          <Route path="/home/signin" exact>
            <AuthenticateDialog
              signin
              onUsernameNotAvailable={this.onUsernameNotAvailable}
              setUsernameHandler={this.setUsernameHandler}
              setUsernameBtnLoading={this.state.setUsernameBtnLoading}
              userDialog={this.props.usernameNotAdded}
              showGoogleBtnLoading={this.state.showGoogleBtnLoading}
              googleSignin={this.googleSigninHandler}
              submitted={this.onSigninHandler}
              inputElems={this.state.inputElems}
              clicked={this.removeDialogHandler}
              changed={this.updateValueHandler}
              changeMode={this.signupBtnHandler}
              btnLoading={this.state.signinBtnLoading}
            />
          </Route>
        </main>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    userId: state.user.userId,
    usernameNotAdded: state.showUserNameDialog,
    photoUrl: state.user.photoUrl,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateResponse: (message, isErr, show) =>
      dispatch(actionCreators.updateResponse(message, isErr, show)),
    updateLoggedInStatus: (status) =>
      dispatch(actionCreators.updateLoggedStatus(status)),
    updateShowUserDialog: (show) =>
      dispatch(actionCreators.updateShowUserDialog(show)),
    updateUserDetails: (userId, photoUrl, username) =>
      dispatch(actionCreators.updateUserDetails(userId, photoUrl, username)),
    updateSigningWithGoogle: (status) =>
      dispatch(actionCreators.updateSigningWithGoogle(status)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
