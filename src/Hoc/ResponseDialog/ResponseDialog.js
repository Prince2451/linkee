import React, { Component } from "react";
import classes from "./ResponseDialog.module.css";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actionCreators/actionCreators";
class ResponseDialog extends Component {
  animationEndHandler = (e) => {
    this.props.updateResponse('',false,false)
  };
  render() {
    let response = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classes.Svg}
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
      </svg>
    );
    if (this.props.error) {
      response = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={classes.Svg}
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
        </svg>
      );
    }
    return (
      <>
        {this.props.children}
        {this.props.show ? (
          <div
            onAnimationEnd={this.animationEndHandler}
            ref={this.setElement}
            className={[
              classes.Dialog,
              this.props.err ? classes.Red : classes.Green,
              classes.Animate,
            ].join(" ")}
            style={{
              backgroundColor: this.props.error
                ? "rgb(228, 118, 114)"
                : "rgb(41, 153, 50)",
            }}
          >
            <div
              className={classes.Image}
              style={{
                backgroundColor: this.props.error
                  ? "rgb(204, 67, 67)"
                  : "rgb(77, 190, 86)",
              }}
            >
              {response}
            </div>
            <p className={classes.Message}>{this.props.message}</p>
          </div>
        ) : null}
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    show: state.response.show,
    error: state.response.isErr,
    message: state.response.message,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateResponse: (message, isErr, show) =>
      dispatch(actionCreators.updateResponse(message, isErr, show)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponseDialog);
