import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import SearchJob from "./SearchJob";
import NavBar from "./NavBar";
import JobCards from "./JobCards";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/actions/jobActions";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => Object.values(state.job.jobs) || []);

  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    "Montserrat-Italic": require("../assets/fonts/Montserrat/static/Montserrat-Italic.ttf"),
    "OpenSans-Regular": require("../assets/fonts/Open_Sans/static/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("../assets/fonts/Open_Sans/static/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    const loadResources = async () => {
      if (!fontsLoaded) return;

      await dispatch(fetchJobs());
      setLoading(false);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };

    loadResources();
  }, [fontsLoaded]);

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#c6a02d" />
          <Text style={styles.loadingText}>Loading App...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        style={{ opacity: fadeAnim }}
      >
        <NavBar />
        <SearchJob />
        <JobCards navigation={navigation} />
        <Footer />
      </Animated.ScrollView>
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
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 1000,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#333",
  },
});
