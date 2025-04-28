import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import JobListScreen from "../components/JobListScreen";
import JobDetails from "../components/JobDetails"; // Import JobDetails component

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
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{ title: "Job Details" }} // Customize header title for JobDetails screen
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
