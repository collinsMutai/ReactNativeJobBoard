import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./reducers/jobReducer";

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    job: jobReducer, // Add job reducer to the store
  },
});

export default store;
