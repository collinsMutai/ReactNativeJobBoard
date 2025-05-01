import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux"; // Import useSelector to get user state from Redux
import HomeScreen from "../components/HomeScreen";
import JobListScreen from "../components/JobListScreen";
import JobDetails from "../components/JobDetails"; // Import JobDetails component
import AdminDashboard from "../components/AdminDashboard";
import { Text, View, ActivityIndicator } from "react-native"; // For unauthorized message and loading indicator

const Stack = createNativeStackNavigator();

// Protected Admin Route Component
const ProtectedAdminRoute = ({ component: Component, ...props }) => {
  const currentUser = useSelector((state) => state.auth.currentUser); // Get currentUser from Redux

  // Show a loading spinner if currentUser is still being fetched
  if (currentUser === null) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color="#c6a02d" />
      </View>
    );
  }

  // Check if user is logged in and if they are an admin
  if (!currentUser || currentUser.role !== "admin") {
    // If the user is not logged in or is not an admin, show an unauthorized message
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 18, color: "red" }}>
          You are not authorized to access this page.
        </Text>
      </View>
    );
  }

  // If user is admin, render the requested component
  return <Component {...props} />;
};

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
        options={{ title: "Back" }} // Customize header title for Jobs screen
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{ title: "Back" }} // Customize header title for JobDetails screen
      />
      <Stack.Screen
        name="Admin"
        component={(props) => (
          <ProtectedAdminRoute {...props} component={AdminDashboard} />
        )}
        options={{ title: "Admin Dashboard" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
