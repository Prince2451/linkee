export const UPDATE_RESPONSE = "UPDATE_RESPONSE";
export const UPDATE_LOGGED_STATUS = "UPDATE_LOGGED_STATUS";
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
export const UPDATE_SINGING_WITH_GOOGLE = "UPDATE_SINGING_WITH_GOOGLE";
export const UPDATE_SHOW_USERNAME_DIALOG = "UPDATE_SHOW_USERNAME_DIALOG";
export const updateResponse = (message, isErr, show) => {
  return {
    type: UPDATE_RESPONSE,
    message: message,
    isErr: isErr,
    show: show,
  };
};
export const updateSigningWithGoogle = (status) => {
  return {
    type: UPDATE_SINGING_WITH_GOOGLE,
    status: status,
  };
};
export const updateShowUserDialog = (show) => {
  return {
    type: UPDATE_SHOW_USERNAME_DIALOG,
    show: show,
  };
};
export const updateLoggedStatus = (status) => {
  return {
    type: UPDATE_LOGGED_STATUS,
    status: status,
  };
};
export const updateUserDetails = (userId = null, photoUrl = null,username=null) => {
  return {
    type: UPDATE_USER_DETAILS,
    userId: userId,
    photoUrl: photoUrl,
    username: username
  };
};
