import React, { Component } from "react";
import classes from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import Menu from "../../Component/Menu/Menu";

class Navbar extends Component {
  state = {
    show: false,
  };
  toggleMenuHandler = (e) => {
    this.setState((preState) => ({ show: !preState.show }));
  };
  removeMenuHandler = (e) => {
    this.setState({ show: false });
  };
  render() {
    return (
      <nav className={classes.NavBar}>
        <img className={classes.Logo} src={logo} alt="logo" />
        <Menu
          show={this.state.show}
          toggleMenuHandler={this.toggleMenuHandler}
          clicked={this.removeMenuHandler}
        >
          {this.props.children}
        </Menu>
      </nav>
    );
  }
}
export default Navbar;
