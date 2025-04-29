import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  RESET_PASSWORD,
} from "../actions/authActionTypes";

const initialState = {
  currentUser: null,
  registeredUsers: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registeredUsers: [...state.registeredUsers, action.payload],
        currentUser: action.payload,
      };
    case LOGIN_USER:
      const user = state.registeredUsers.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      return {
        ...state,
        currentUser: user || null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: null,
      };
    case RESET_PASSWORD:
      alert(`Password reset link sent to ${action.payload.email}`);
      return state;
    default:
      return state;
  }
};

export default authReducer;
