import * as actionCreators from "../actionCreators/actionCreators";
const initialState = {
  response: {
    message: "",
    isErr: null,
    show: false,
  },
  loggedIn: false,
  user: {
    userId: null,
    photoUrl: null,
    username: null,
  },
  showUserNameDialog: false,
  signingWithGoogle: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionCreators.UPDATE_RESPONSE:
      return {
        ...state,
        response: {
          message: action.message,
          isErr: action.isErr,
          show: action.show,
        },
      };
    case actionCreators.UPDATE_LOGGED_STATUS:
      return {
        ...state,
        loggedIn: action.status,
      };
    case actionCreators.UPDATE_USER_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          userId: action.userId,
          photoUrl: action.photoUrl,
          username: action.username,
        },
      };
    case actionCreators.UPDATE_SINGING_WITH_GOOGLE:
      return {
        ...state,
        signingWithGoogle: action.status,
      };
    case actionCreators.UPDATE_SHOW_USERNAME_DIALOG:
      return {
        ...state,
        showUserNameDialog: action.show,
      };
    default:
      return state;
  }
};

export default reducer;
