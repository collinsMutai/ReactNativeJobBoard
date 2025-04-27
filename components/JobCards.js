import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import JobCard from "./JobCard"; // Import the JobCard component
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for chevron icons
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const JobCards = () => {
  // Fetch jobs from the Redux store using useSelector
  const jobs = useSelector((state) => Object.values(state.job.jobs)); // Convert jobs object to an array
  const navigation = useNavigation(); // Get the navigation hook

  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  // Handle previous button click
  const handlePrev = () => {
    if (currentJobIndex > 0) {
      setCurrentJobIndex(currentJobIndex - 3); // Show the previous set of 3 jobs
    }
  };

  // Handle next button click
  const handleNext = () => {
    if (currentJobIndex < jobs.length - 3) {
      setCurrentJobIndex(currentJobIndex + 3); // Show the next set of 3 jobs
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Jobs</Text>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {/* Pass sliced jobs as props to JobCard */}
        <JobCard jobs={jobs.slice(currentJobIndex, currentJobIndex + 3)} />

        {/* Navigation buttons and "View All Jobs" button placed inline */}
        <View style={styles.navButtonsContainer}>
          {/* "View All Jobs" Button */}
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate("Jobs")} // Navigating to Jobs screen
          >
            <Text style={styles.viewAllButtonText}>View All Jobs</Text>
          </TouchableOpacity>

          {/* Navigation buttons (Prev and Next) */}
          <View style={styles.navButtons}>
            <TouchableOpacity
              onPress={handlePrev}
              disabled={currentJobIndex === 0}
            >
              <Ionicons
                name="chevron-back-outline"
                size={30}
                color={currentJobIndex === 0 ? "#ccc" : "#c6a02d"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              disabled={currentJobIndex >= jobs.length - 3}
            >
              <Ionicons
                name="chevron-forward-outline"
                size={30}
                color={currentJobIndex >= jobs.length - 3 ? "#ccc" : "#c6a02d"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  cardContainer: {
    alignItems: "center",
    paddingBottom: 30,
  },
  navButtonsContainer: {
    flexDirection: "row", // Align items in a row
    justifyContent: "space-between", // Space between the "View All Jobs" and the prev/next buttons
    width: "100%", // Make sure the container takes up full width
    marginTop: 12,
    paddingHorizontal: 16,
  },
  viewAllButton: {
    backgroundColor: "#c6a02d",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  viewAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navButtons: {
    flexDirection: "row", // Align buttons in a row (Prev and Next)
    alignItems: "center",
  },
});

export default JobCards;
