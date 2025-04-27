import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import SearchJob from "./components/SearchJob";
import NavBar from "./components/NavBar";
import JobCards from "./components/JobCards";
import Footer from "./components/Footer";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./assets/fonts/Montserrat/static/Montserrat-Regular.ttf"), // Montserrat Regular font
    "Montserrat-Italic": require("./assets/fonts/Montserrat/static/Montserrat-Italic.ttf"), // Montserrat Italic font
    "OpenSans-Regular": require("./assets/fonts/Open_Sans/static/OpenSans-Regular.ttf"), // Open Sans Regular font
    "OpenSans-Bold": require("./assets/fonts/Open_Sans/static/OpenSans-Bold.ttf"), // Open Sans Bold font
  });

  // Show loading screen until fonts are loaded
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <ScrollView contentContainerStyle={styles.container}>
        <NavBar />
        <SearchJob />
        <JobCards />
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flexGrow: 1,
  },
});
