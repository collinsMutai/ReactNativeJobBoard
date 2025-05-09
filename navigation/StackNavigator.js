import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/HomeScreen";
import JobListScreen from "../components/JobListScreen";
import JobDetails from "../components/JobDetails";
import AdminDashboard from "../components/AdminDashboard";
import ResetPasswordScreen from "../components/ResetPasswordScreen"; // Import your reset screen here

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Jobs"
        component={JobListScreen}
        options={{ title: "Jobs" }}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{ title: "Job Details" }}
      />
      <Stack.Screen
        name="Admin"
        component={AdminDashboard}
        options={{ title: "Admin Dashboard" }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: "Reset Password" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
