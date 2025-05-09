import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import store from "./redux/store";
import Toast from "react-native-toast-message";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");

export default function App() {
  const linking = {
    prefixes: [prefix, "jobsearchapp://"], // Your custom scheme
    config: {
      screens: {
        ResetPassword: "reset-password", // Matches route name in StackNavigator
        // Add other screens if needed
      },
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}
