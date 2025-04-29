import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./reducers/jobReducer";
import authReducer from "./reducers/authReducer";

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    job: jobReducer, // Add job reducer to the store
    auth: authReducer,
  },
});

export default store;
