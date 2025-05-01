import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  RESET_PASSWORD,
} from "../actions/authActionTypes";

// redux/reducers/authReducer.js
const initialState = {
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload, // full user with role
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};


export default authReducer;
