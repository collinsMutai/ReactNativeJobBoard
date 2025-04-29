import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  RESET_PASSWORD,
} from "./authActionTypes";

// Simulate async API call
const fakeApiCall = (success = true) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      success
        ? resolve({ message: "Success" })
        : reject(new Error("Simulated error"));
    }, 1000)
  );

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await fakeApiCall(true); // Simulate success
    dispatch({ type: LOGIN_USER, payload: { email } });
    return response; // <-- Return success response
  } catch (error) {
    throw error;
  }
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const response = await fakeApiCall(true);
    dispatch({ type: REGISTER_USER, payload: { email } });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const response = await fakeApiCall(true);
    dispatch({ type: RESET_PASSWORD, payload: { email } });
    return response;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
