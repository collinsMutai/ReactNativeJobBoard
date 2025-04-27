import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import JobCard from "./JobCard"; // Assuming you are using this component to display the jobs

const Jobs = () => {
  // Get jobs from Redux state
  const jobs = useSelector((state) => Object.values(state.job.jobs)); // Get jobs as an array from the object
  const isLoading = useSelector((state) => state.job.isLoading); // Check loading state (optional)
  const error = useSelector((state) => state.job.error); // Error state (optional)

  if (isLoading) {
    return <Text>Loading jobs...</Text>; // Display loading message
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Display error if any occurs
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Jobs</Text>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {/* Pass jobs as props to the JobCard component */}
        <JobCard jobs={jobs} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  cardContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default Jobs;
