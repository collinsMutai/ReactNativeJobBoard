import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator"; // Ensure the import path is correct
import store from "./redux/store"; // Import the Redux store

export default function App() {
  return (
    <Provider store={store}>
      {/* Wrap the app with Redux Provider */}
      <NavigationContainer>
        {/* Wrap the app with NavigationContainer */}
        <StackNavigator /> {/* The Stack Navigator handles screen navigation */}
      </NavigationContainer>
    </Provider>
  );
}
