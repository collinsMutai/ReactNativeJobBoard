import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  RESET_PASSWORD,
} from "./authActionTypes";

import { saveToken, deleteToken } from "../../utils/secureStore";
import { useSelector, useDispatch } from "react-redux";

const API_URL = "http://192.168.100.7:5000/api/auth"; // Replace with your deployed backend if needed

// Login User Action
// Login User Action
export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save the token
      // await saveToken(data.token);

      // Dispatch the login action
      dispatch({
        type: LOGIN_USER,
        payload: data.user, // user: { id, email, role }
      });

      return data; // Allow post-login handling (e.g., navigation)
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };
};


// Register User Action
export const registerUser = (email, password) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Registration failed");

   

    dispatch({
      type: REGISTER_USER,
      payload: data.user, // Assuming `data.user` contains the user object
    });

    return data; // Optionally return the data if needed
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

// Reset Password Action
export const resetPassword = (email) => async (dispatch) => {
  try {
    const res = await fetch(`${API_URL}/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Password reset failed");

    dispatch({
      type: RESET_PASSWORD,
      payload: { email },
    });

    return data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

// Logout User Action
export const logoutUser = () => async (dispatch) => {
  // await deleteToken(); 
  dispatch({ type: LOGOUT_USER }); // Dispatch logout action
};
