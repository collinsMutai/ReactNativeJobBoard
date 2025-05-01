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

      // Dispatch the login action
      dispatch({
        type: LOGIN_USER,
        payload: data.user, // Assuming `data.user` contains the user object
      });

      return data; // You can return the data if you want to handle something post-login
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // This will allow the caller to handle errors if necessary
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

    // Optionally save the token and dispatch user data
    await saveToken(data.token); // You may auto-login after register, if desired

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
  await deleteToken(); // Remove the token from secure storage
  dispatch({ type: LOGOUT_USER }); // Dispatch logout action
};
