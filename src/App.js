import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import classes from "./App.module.css";
import firebase from "./Firebase";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import * as actionCreators from "./store/actionCreators/actionCreators";
import Logo from "./Component/UI/Logo/Logo";
import ResponseDialog from "./Hoc/ResponseDialog/ResponseDialog";
import NotFound from "./Component/NotFound/NotFound";
const Admin = React.lazy(() => import("./Container/Admin/Admin"));
const Home = React.lazy(() => import("./Container/Home/Home"));
const UserProfile = React.lazy(() =>
  import("./Container/UserProfile/UserProfile")
);
class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .doc("users/" + user.uid)
          .get()
          .then((res) => {
            if (res.exists) {
              const data = res.data();
              if (user.emailVerified) {
                this.props.updateLoggedInStatus(true);
              }
              this.props.updateUserDetails(
                user.uid,
                data.photoUrl,
                data.username
              );
            } else {
              if (this.props.loggedIn) {
                this.props.updateLoggedInStatus(false);
              }
              if (this.props.signingWithGoogle) {
                this.props.updateShowUsernameDialog(true);
              }
            }
          });
        this.props.updateUserDetails(user.uid);
      } else {
        window.localStorage.removeItem("preState");
        this.props.updateLoggedInStatus(false);
        this.props.updateUserDetails();
        this.props.updateShowUsernameDialog(false);
      }
    });
    let preState = null;
    try {
      preState = window.localStorage.getItem("preState");
      preState = JSON.parse(preState);
    } catch {
      preState = null;
    }
    if (preState) {
      this.props.updateLoggedInStatus(preState.loggedIn);
      this.props.updateUserDetails(
        preState.userId,
        preState.photoURL,
        preState.username
      );
    }
  }

  render() {
    let redirect = null;
    if (this.props.location.pathname === "/") {
      redirect = <Redirect to="/home" />;
    }
    return (
      <>
        {redirect}
        <Suspense
          fallback={
            <div className={classes.Container}>
              <Logo />
            </div>
          }
        >
          <ResponseDialog>
            <Switch>
              <Route path="/admin">
                {!this.props.loggedIn ? <Redirect to="/" /> : <Admin />}
              </Route>
              <Route path="/home">
                {this.props.loggedIn ? <Redirect to="/admin" /> : <Home />}
              </Route>
              <Route path="/:username" exact>
                <UserProfile />
              </Route>
              <Route path="/">
                <NotFound />
              </Route>
            </Switch>
          </ResponseDialog>
        </Suspense>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    loggedIn: state.loggedIn,
    launched: state.appLaunched,
    signingWithGoogle: state.signingWithGoogle,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateLoggedInStatus: (status) =>
      dispatch(actionCreators.updateLoggedStatus(status)),
    updateUserDetails: (userId, photoURL, username) =>
      dispatch(actionCreators.updateUserDetails(userId, photoURL, username)),
    updateShowUsernameDialog: (show) =>
      dispatch(actionCreators.updateShowUserDialog(show)),
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
