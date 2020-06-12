import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import firebase from "../../Firebase";
import classes from "./Admin.module.css";
import { connect } from "react-redux";
import user from "../../assets/user.png";
import Toolbar from "../../Component/Toolbar/Toolbar";
import Links from "../../Component/LInks/Links";
import Settings from "../../Component/Settings/Settings";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import * as actionCreators from "../../store/actionCreators/actionCreators";
import Userview from "../../Component/Userview/Userview";
//backend for react-multi-backend
const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
      preview: true,
    },
    {
      backend: TouchBackend, // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition,
    },
  ],
};
const eleConfig = {
  title: {
    required: true,
  },
  link: {
    pattern: /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
  },
};
class Admin extends Component {
  state = {
    showErrorImage: false,
    userInput: {
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
        isValid: true,
        touched: true,
        errMsg: "",
        value: this.props.username === null ? "" : this.props.username,
      },
    },
    progress: 0,
    progressBg: 0,
    updateBtnLoading: false,
    background: {
      backgroundType: "Color",
      backgroundImage: "",
      primaryColor: "#ffffff",
      secondaryColor: "#ffffff",
      backgroundColor: "#ffffff",
      textColor: "#ffffff",
      gradientDirection: "to right",
    },
    currentMaxId: 0,
    button: {
      buttonType: "Solid",
    },
    windowSize: window.innerWidth,
    links: [],
    updateAppearenceBtnLoading: false,
    isLoading: true,
  };
  componentDidMount() {
    firebase
      .firestore()
      .doc("users/" + this.props.userId)
      .get()
      .then((res) => {
        if (res.exists) {
          const data = res.data();
          this.setState({
            ...data,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        let errMsg;
        if (err.code === "auth/network-request-failed") {
          errMsg = "Network Error";
        } else {
          errMsg = "Something went wrong";
        }
        this.setState({ isLoading: false });
        this.props.updateResponse(errMsg, true, true);
      });
    window.addEventListener("resize", this.updateWindowSize);
    window.localStorage.setItem(
      "preState",
      JSON.stringify({
        loggedIn: true,
        userId: this.props.userId,
        username: this.props.username,
        photoUrl: this.props.photoUrl,
      })
    );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowSize);
  }
  updateWindowSize = (e) => {
    this.setState({
      windowSize: window.innerWidth,
    });
  };
  changeBackgroundSecondaryColor = (e) => {
    this.setState({
      background: {
        ...this.state.background,
        secondaryColor: e.target.value,
      },
    });
  };
  changeBackgroundPrimaryColor = (e) => {
    this.setState({
      background: {
        ...this.state.background,
        primaryColor: e.target.value,
      },
    });
  };
  changeBackgroundColor = (e) => {
    this.setState({
      background: {
        ...this.state.background,
        backgroundColor: e.target.value,
      },
    });
  };
  updateAppearenceHandler = (e) => {
    const data = {
      background: {
        ...this.state.background,
      },
      button: {
        ...this.state.button,
      },
    };
    this.setState({ updateAppearenceBtnLoading: true });
    firebase
      .firestore()
      .doc("users/" + this.props.userId)
      .update(data)
      .then(() => {
        this.setState({ updateAppearenceBtnLoading: false });
        this.props.updateResponse("Updated", false, true);
      })
      .catch((err) => {
        let errMsg;
        if (err.code === "auth/network-request-failed") {
          errMsg = "Network Error";
        } else {
          errMsg = "Something went wrong";
        }
        this.setState({ updateAppearenceBtnLoading: false });
        this.props.updateResponse(errMsg, true, true);
      });
  };
  changeBackgroundImage = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    if (fileType.includes("image")) {
      let ref = firebase
        .storage()
        .ref("dp/" + this.props.userId + "/bgImage.jpg");
      let uploadTask = ref.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const c = Math.PI * (17 * 2);
          const pct = ((100 - value) / 100) * c;
          this.setState({
            progressBg: pct,
          });
        },
        (err) => {
          let errMsg;
          if (err.code === "auth/network-request-failed") {
            errMsg = "Network Error";
          } else {
            errMsg = "Something went wrong";
          }
          this.setState({
            progressBg: 0,
          });
          this.props.updateResponse(errMsg, true, true);
        },
        () => {
          let photoUrl = null;
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              photoUrl = url;
              this.setState({
                progressBg: 0,
                background: {
                  ...this.state.background,
                  backgroundImage: photoUrl,
                },
              });
              this.props.updateResponse("Upload sucess", false, true);
            })
            .catch((err) => {
              this.setState({
                progressBg: 0,
              });
              let errMsg;
              if (err.code === "auth/network-request-failed") {
                errMsg = "Network Error";
              } else {
                errMsg = "Something went wrong";
              }
              this.props.updateResponse(errMsg,true,false);
            });
        }
      );
    }
    e.target.value = "";
  };
  changeBackgroundType = (e) => {
    this.setState({
      background: {
        ...this.state.background,
        backgroundType: e.target.value,
      },
    });
  };
  changeTextColor = (e) => {
    this.setState({
      background: {
        ...this.state.background,
        textColor: e.target.value,
      },
    });
  };
  changeGradientDirection = (e) => {
    this.setState({
      background: {
        ...this.state.background,
        gradientDirection: e.target.value,
      },
    });
  };
  changeButtonType = (e) => {
    this.setState({
      button: {
        ...this.state.button,
        buttonType: e.target.value,
      },
    });
  };
  checkValidity = (ele, userInput, eleConfig) => {
    let element = { ...userInput[ele.name] };
    let isValid = true;
    let errMsg = null;
    if (eleConfig.pattern) {
      isValid = eleConfig.pattern.test(ele.value.trim()) && isValid;
      errMsg = eleConfig.pattern.test(ele.value.trim())
        ? errMsg
        : element.requiredPattern;
    }
    if (eleConfig.minLength) {
      isValid = ele.value.length >= eleConfig.minLength && isValid;
      errMsg =
        ele.value.length >= eleConfig.minLength
          ? errMsg
          : "Minimum length is " + eleConfig.minLength;
    }
    if (ele.value.length > eleConfig.maxLength) {
      ele.value = ele.value.substring(0, ele.value.length - 1);
    }
    if (eleConfig.required) {
      isValid = ele.value.trim() && isValid;
      errMsg = ele.value.trim() ? errMsg : "field required";
    }
    element.isValid = isValid;
    element.errMsg = errMsg;
    element.touched = true;
    return element;
  };
  updateUserInput = (e) => {
    let eleObject = this.checkValidity(
      e.target,
      this.state.userInput,
      this.state.userInput.username.eleConfig
    );
    this.setState({
      userInput: {
        ...this.state.userInput,
        [e.target.name]: {
          ...eleObject,
          value: e.target.value.trim(),
        },
      },
    });
  };
  logoutUser() {
    firebase.auth().signOut();
  }
  imageNotFoundHanlder = (e) => {
    if (this.state.showErrorImage) {
      this.setState({ showErrorImage: true });
    }
    e.target.src = user;
  };
  onUsernameNotAvailable = (value) => {
    if (this.props.username === value.trim()) {
      return;
    }
    this.setState({
      userInput: {
        ...this.state.userInput,
        username: {
          ...this.state.userInput.username,
          isValid: false,
          errMsg: "username not available",
        },
      },
    });
  };
  uploadPhotoHanlder = (e) => {
    const file = e.target.files[0];
    const fileType = file.type;
    if (fileType.includes("image")) {
      let ref = firebase.storage().ref("dp/" + this.props.userId + "/dp.jpg");
      let uploadTask = ref.put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const c = Math.PI * (30 * 2);
          const pct = ((100 - value) / 100) * c;
          this.setState({
            progress: pct,
          });
        },
        (err) => {
          let errMsg;
          if (err.code === "auth/network-request-failed") {
            errMsg = "Network Error";
          } else {
            errMsg = "Something went wrong";
          }
          this.setState({
            progress: 0,
          });
          this.props.updateResponse(errMsg, true, true);
        },
        () => {
          let photoUrl = null;
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              photoUrl = url;
              return firebase
                .firestore()
                .doc("users/" + this.props.userId)
                .update({ photoUrl: photoUrl });
            })
            .then(() => {
              this.setState({
                progress: 0,
              });
              this.props.updateResponse("Upload sucess", false, true);
              this.props.updateUserDetails(
                this.props.userId,
                photoUrl,
                this.props.username
              );
            })
            .catch((err) => {
              this.setState({
                progress: 0,
              });
              let errMsg;
              if (err.code === "auth/network-request-failed") {
                errMsg = "Network Error";
              } else {
                errMsg = "Something went wrong";
              }
              this.props.updateResponse(errMsg,true,false);

            });
        }
      );
    }
    e.target.value = "";
  };
  async updateUserNameAtDB(userId, username) {
    let res = await firebase
      .firestore()
      .collection("users")
      .where("username", "==", username)
      .get();
    if (!res.empty) {
      this.setState({
        userInput: {
          ...this.state.userInput,
          username: {
            ...this.state.userInput.username,
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
        .update({
          username: username,
        });
    }
    return res;
  }
  updateUsername = (e) => {
    let username = this.state.userInput.username.value;
    if (username === this.props.username) {
      return;
    }
    if (this.state.userInput.username.isValid) {
      this.setState({
        updateBtnLoading: true,
      });
      this.updateUserNameAtDB(
        this.props.userId,
        this.state.userInput.username.value
      )
        .then((res) => {
          if (res) {
            this.props.updateUserDetails(
              this.props.userId,
              this.props.photoUrl,
              username
            );
            this.props.updateResponse("Username Updated", false, true);
          }
          this.setState({
            updateBtnLoading: false,
          });
        })
        .catch((err) => {
          this.setState({
            updateBtnLoading: false,
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
      if (!this.state.userInput.username.touched) {
        this.setState({
          userInput: {
            username: {
              ...this.state.userInput.username,
              touched: true,
              errMsg: "field required",
            },
          },
        });
      }
    }
  };
  updateLinkValueHandler = (e, index) => {
    let eleObject = this.checkValidity(
      e.target,
      this.state.links[index].inputElems,
      eleConfig[e.target.name]
    );
    let links = [...this.state.links];
    links[index] = {
      ...this.state.links[index],
      inputElems: {
        ...this.state.links[index].inputElems,
        [e.target.name]: { ...eleObject, value: e.target.value.trimLeft() },
      },
    };
    this.setState({
      links: [...links],
    });
  };
  checkChangedHandler = (e, index) => {
    let links = [...this.state.links];
    links[index].checked = !this.state.links[index].checked;
    this.setState({
      links: [...links],
    });
    this.updateLinksInDB(links);
  };
  makeDraggableHandler = (e, index) => {
    let links = [...this.state.links];
    links[index].draggable = true;
    this.setState({
      links: [...links],
    });
  };
  moveElement = (initialIndex, finalIndex) => {
    const links = [...this.state.links];
    const dragItem = links[initialIndex];
    links.splice(initialIndex, 1);
    links.splice(finalIndex, 0, dragItem);
    this.setState({ links: [...links] });
  };
  addNewLInkHandler = (e) => {
    const newLink = {
      inputElems: {
        title: {
          value: "",
          isValid: false,
          touched: false,
        },
        link: {
          value: "",
          isValid: false,
          touched: false,
        },
      },
      checked: false,
      draggable: false,
      id: this.state.currentMaxId || 0 + 1,
    };
    const links = [...this.state.links];
    links.unshift(newLink);
    this.setState({ isLoading: true });
    firebase
      .firestore()
      .doc("users/" + this.props.userId)
      .update({
        links: [...links],
        currentMaxId: this.state.currentMaxId + 1,
      })
      .then((res) => {
        this.setState((preState) => ({
          isLoading: false,
          links: [...links],
          currentMaxId: preState.currentMaxId + 1,
        }));
        this.props.updateResponse("Updated", false, true);
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        let errMsg;
        if (err.code === "auth/network-request-failed") {
          errMsg = "Network Error";
        } else {
          errMsg = "Something went wrong";
        }
        this.props.updateResponse(errMsg, true, true);
      });
  };
  deleteLinkHandler = (e, index) => {
    const links = [...this.state.links];
    links.splice(index, 1);
    this.setState({ links: [...links] });
    this.updateLinksInDB(links);
  };
  removeDraggable = (index) => {
    const links = [...this.state.links];
    links[index].draggable = false;
    this.setState({
      links: [...links],
    });
  };
  updateLinksInDB = (data) => {
    firebase
      .firestore()
      .doc("users/" + this.props.userId)
      .update({ links: [...data] })
      .then((res) => {
        this.props.updateResponse("Updated", false, true);
      })
      .catch((err) => {
        let errMsg;
        if (err.code === "auth/network-request-failed") {
          errMsg = "Network Error";
        } else {
          errMsg = "Something went wrong";
        }
        this.props.updateResponse(errMsg, true, true);
      });
  };
  updateLinksValue = () => {
    this.updateLinksInDB(this.state.links);
  };
  render() {
    let toolbar = null;
    let view = null;
    if (this.state.windowSize >= 800) {
      toolbar = <Toolbar username={this.props.username} />;
      view = (
        <div className={classes.ViewContainer}>
          <Userview
            links={this.state.links}
            imageSrc={
              this.state.showErrorImage
                ? user
                : this.props.photoUrl
                ? this.props.photoUrl
                : user
            }
            button={this.state.button}
            background={this.state.background}
          />
        </div>
      );
    } else {
      toolbar = <Toolbar view username={this.props.username} />;
      view = (
        <Route path="/admin/view">
          <div className={classes.ViewContainer}>
            <Userview
              links={this.state.links}
              imageSrc={
                this.state.showErrorImage
                  ? user
                  : this.props.photoUrl
                  ? this.props.photoUrl
                  : user
              }
              button={this.state.button}
              background={this.state.background}
            />
          </div>
        </Route>
      );
    }
    return (
      <div className={classes.AdminContainer}>
        <Navbar>
          <div className={classes.Account}>
            <Link className={classes.LinkBtn} to="/admin/settings">
              <div className={classes.ImageContainer}>
                <img
                  className={classes.Image}
                  src={
                    this.state.showErrorImage
                      ? user
                      : this.props.photoUrl
                      ? this.props.photoUrl
                      : user
                  }
                  onError={this.imageNotFoundHanlder}
                alt='' />
              </div>
              <span className={classes.Span}>My Account</span>
            </Link>
          </div>
          <button
            className={classes.LogoutBtn}
            onClick={this.logoutUser}
            type="button"
          >
            Log out
          </button>
        </Navbar>
        {toolbar}
        <div className={classes.BodyContainer}>
          <div className={classes.Admin}>
            <div>
              <Switch>
                <Route path="/admin" exact>
                  <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                    <Links
                      links={this.state.links}
                      updateLinkValueHandler={this.updateLinkValueHandler}
                      checkChangedHandler={this.checkChangedHandler}
                      makeDraggableHandler={this.makeDraggableHandler}
                      moveElement={this.moveElement}
                      addNewLInkHandler={this.addNewLInkHandler}
                      deleteLinkHandler={this.deleteLinkHandler}
                      removeDraggable={this.removeDraggable}
                      isMobile={this.state.windowSize < 800}
                      isLoading={this.state.isLoading}
                      updateLinksInDB={this.updateLinksValue}
                    />
                  </DndProvider>
                </Route>
                <Route path="/admin/settings">
                  <Settings
                    logOut={this.logoutUser}
                    background={this.state.background}
                    button={this.state.button}
                    changeBackgroundColor={this.changeBackgroundColor}
                    changeBackgroundImage={this.changeBackgroundImage}
                    changeBackgroundPrimaryColor={
                      this.changeBackgroundPrimaryColor
                    }
                    changeBackgroundSecondaryColor={
                      this.changeBackgroundSecondaryColor
                    }
                    changeBackgroundType={this.changeBackgroundType}
                    changeButtonType={this.changeButtonType}
                    changeGradientDirection={this.changeGradientDirection}
                    changeTextColor={this.changeTextColor}
                    updateUsername={this.updateUsername}
                    inputElem={this.state.userInput}
                    changed={this.updateUserInput}
                    photoUrl={
                      this.state.showErrorImage
                        ? user
                        : this.props.photoUrl
                        ? this.props.photoUrl
                        : user
                    }
                    username={this.props.username}
                    userId={this.props.userId}
                    onUsernameNotAvailable={this.onUsernameNotAvailable}
                    uploadPhotoHanlder={this.uploadPhotoHanlder}
                    progress={this.state.progress}
                    updateBtnLoading={this.state.updateBtnLoading}
                    progressBg={this.state.progressBg}
                    updateAppearence={this.updateAppearenceHandler}
                    updateAppearenceBtnLoading={
                      this.state.updateAppearenceBtnLoading
                    }
                  />
                </Route>
                {this.state.windowSize < 800 ? view : null}
              </Switch>
            </div>
          </div>
          {this.state.windowSize >= 800 ? (
            <div className={classes.View}>{view}</div>
          ) : null}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userId: state.user.userId,
    photoUrl: state.user.photoUrl,
    username: state.user.username,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateResponse: (message, isErr, show) =>
      dispatch(actionCreators.updateResponse(message, isErr, show)),
    updateUserDetails: (userId, photoUrl, username) =>
      dispatch(actionCreators.updateUserDetails(userId, photoUrl, username)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
