import React, { Component } from "react";
import classes from "./UserProfile.module.css";
import { withRouter } from "react-router-dom";
import Userview from "../../Component/Userview/Userview";
import firebase from "../../Firebase";
import userLogo from "../../assets/user.png";
import NotFound from "../../Component/NotFound/NotFound";
export class UserProfile extends Component {
  state = {
    username: this.props.location.pathname.substr(
      1,
      this.props.location.pathname.length
    ),
    background: {
      backgroundType: "Color",
      backgroundImage: "",
      primaryColor: "#ffffff",
      secondaryColor: "#ffffff",
      backgroundColor: "#ffffff",
      textColor: "#ffffff",
      gradientDirection: "to right",
    },
    photoUrl: null,
    button: {
      buttonType: "Solid",
    },
    links: [],
    isError: false,
    notFound: false,
  };
  componentDidMount() {
    firebase
      .firestore()
      .collection("users/")
      .where("username", "==", this.state.username)
      .get()
      .then((res) => {
        if (res.empty) {
          this.setState({ notFound: true });
        } else {
          this.setState({ ...this.state, ...res.docs[0].data() });
        }
      });
  }
  render() {
    let notFound;
    if (this.state.notFound) {
      notFound = <NotFound />;
    }
    return (
      notFound || (
        <div className={classes.UserProfie}>
          <Userview
            links={this.state.links}
            imageSrc={this.state.photoUrl || userLogo}
            button={this.state.button}
            background={this.state.background}
          />
        </div>
      )
    );
  }
}

export default withRouter(UserProfile);
