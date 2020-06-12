import React from "react";
import classes from "./Settings.module.css";
import Account from "../Account/Account";
import Appearence from "../Appearence/Appearence";

const Settings = (props) => {
  return (
    <div className={classes.Settings}>
      <div className={classes.AccountInfo}>
        <h2>Account Details</h2>
        <Account
          logOut={props.logOut}
          updateBtnLoading={props.updateBtnLoading}
          updateUsername={props.updateUsername}
          inputElems={props.inputElem}
          changed={props.changed}
          photoUrl={props.photoUrl}
          username={props.username}
          userId={props.userId}
          onUsernameNotAvailable={props.onUsernameNotAvailable}
          uploadPhotoHanlder={props.uploadPhotoHanlder}
          progress={props.progress}
          updateAppearence={props.updateAppearence}
        />
      </div>
      <div className={classes.AppearenceInfo}>
        <h2>Appearence</h2>
        <Appearence
          progressBg={props.progressBg}
          background={props.background}
          button={props.button}
          changeBackgroundColor={props.changeBackgroundColor}
          changeBackgroundImage={props.changeBackgroundImage}
          changeBackgroundPrimaryColor={props.changeBackgroundPrimaryColor}
          changeBackgroundSecondaryColor={props.changeBackgroundSecondaryColor}
          changeBackgroundType={props.changeBackgroundType}
          changeButtonType={props.changeButtonType}
          changeGradientDirection={props.changeGradientDirection}
          changeTextColor={props.changeTextColor}
          updateAppearence={props.updateAppearence}
          updateAppearenceBtnLoading={props.updateAppearenceBtnLoading}
        />
      </div>
    </div>
  );
};

export default Settings;
