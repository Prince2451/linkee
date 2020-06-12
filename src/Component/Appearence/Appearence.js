import React from "react";
import classes from "./Appearence.module.css";
import BtnLoadingIndicator from "../UI/BtnLoadingIndiacator/BtnLoadingIndicator";

const Appearence = (props) => {
  let elements = null;
  switch (props.background.backgroundType) {
    case "Color":
      elements = (
        <div>
          <label htmlFor="bgColor">Background color</label>
          <input
            name="bgColor"
            type="color"
            value={props.background.backgroundColor}
            onChange={props.changeBackgroundColor}
          />
        </div>
      );
      break;
    case "Gradient":
      elements = (
        <>
          <div>
            <label>Gradient Direction</label>
            <select
              onChange={props.changeGradientDirection}
              value={props.background.gradientDirection}
            >
              <option>to right</option>
              <option>to left</option>
              <option>to top</option>
              <option>to bottom</option>
            </select>
          </div>
          <div>
            <label htmlFor="primaryColor">Primary color</label>
            <input
              type="color"
              name="primaryColor"
              value={props.background.primaryColor}
              onChange={props.changeBackgroundPrimaryColor}
            />
          </div>
          <div>
            <label htmlFor="secondaryColor">Secondary color</label>
            <input
              type="color"
              name="primaryColor"
              value={props.background.secondaryColor}
              onChange={props.changeBackgroundSecondaryColor}
            />
          </div>
        </>
      );
      break;
    case "Image":
      elements = (
        <div className={classes.UploadContainer}>
          <label htmlFor="bgImage">Background Image</label>
          <div>
            <div className={classes.ProgressBar}>
              <svg
                viewport="0 0 100 100"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: props.progressBg ? "block" : "none" }}
              >
                <circle
                  r="17"
                  cx="20"
                  cy="20"
                  fill="transparent"
                  strokeDasharray="106.76"
                  strokeDashoffset="0"
                ></circle>
                <circle
                  style={{ strokeDashoffset: props.progressBg }}
                  className={classes.Bar}
                  r="17"
                  cx="20"
                  cy="20"
                  fill="transparent"
                  strokeDasharray="106.76"
                  strokeDashoffset="0"
                ></circle>
              </svg>
            </div>
            <input
              type="file"
              accept="Image/*"
              className={classes.FileInput}
              onChange={props.changeBackgroundImage}
            />
            <svg
              className={classes.AddFile}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
          </div>
        </div>
      );
      break;
    default:
      break;
  }
  return (
    <div className={classes.Appearence}>
      <h4>Background</h4>
      <div className={classes.InputContainer}>
        <div>
          <label htmlFor="textColor">Text color</label>
          <input
            name="textColor"
            type="color"
            value={props.background.textColor}
            onChange={props.changeTextColor}
          ></input>
        </div>
        <div>
          <label htmlFor="backgroundType">Background type</label>
          <select
            name="backgroundType"
            value={props.background.backgroundType}
            onChange={props.changeBackgroundType}
          >
            <option>Color</option>
            <option>Gradient</option>
            <option>Image</option>
          </select>
        </div>
        {elements}
      </div>
      <h4>Button</h4>
      <div className={classes.InputContainer}>
        <div>
          <label htmlFor="buttonType">Button Type</label>
          <select
            name="buttonType"
            onChange={props.changeButtonType}
            value={props.button.buttonType}
          >
            <option>Solid</option>
            <option>Outline</option>
            <option>Some more types</option>
          </select>
        </div>
      </div>
      <div className={classes.UpdateBtnContainer}>
        <button onClick={props.updateAppearence} className={classes.UpdateBtn}>
          {props.updateAppearenceBtnLoading ? (
            <BtnLoadingIndicator />
          ) : (
            "Update Appearence"
          )}
        </button>
      </div>
    </div>
  );
};

export default Appearence;
