import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import NavBar from "./NavBar";
import Jobs from "./Jobs";
import Footer from "./Footer";

const JobListScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <NavBar />
          <Jobs />
          <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
});

export default JobListScreen;
