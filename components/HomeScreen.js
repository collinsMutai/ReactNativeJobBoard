import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import SearchJob from "./SearchJob";
import NavBar from "./NavBar";
import JobCards from "./JobCards";
import Footer from "./Footer";

export default function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    "Montserrat-Italic": require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
    "OpenSans-Regular": require("../assets/fonts/Open_Sans/static/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/Open_Sans/static/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <ScrollView contentContainerStyle={styles.container}>
        <NavBar />
        <SearchJob />
        <JobCards navigation={navigation} />
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
