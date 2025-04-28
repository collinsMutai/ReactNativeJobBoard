import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import JobListScreen from "../components/JobListScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Hides the header for HomeScreen
      />
      <Stack.Screen
        name="Jobs"
        component={JobListScreen}
        options={{ title: "Job Listings" }} // Customize header title for Jobs screen
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
