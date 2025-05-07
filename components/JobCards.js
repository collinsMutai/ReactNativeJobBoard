import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Use useDispatch to dispatch actions
import { fetchJobs } from "../redux/actions/jobActions"; // Import the fetchJobs action
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import JobCard from "./JobCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const JobCards = () => {
  const dispatch = useDispatch(); // Initialize dispatch from Redux
  const jobs = useSelector((state) => Object.values(state.job.jobs) || []); // Access jobs from Redux state
  const isLoading = useSelector((state) => state.job.isLoading); // Track if jobs are loading
  const navigation = useNavigation(); // Use navigation hook
  const [currentJobIndex, setCurrentJobIndex] = useState(0);

  // Fetch jobs when the component mounts
  useEffect(() => {
    console.log("Fetching jobs...");
    dispatch(fetchJobs()); // Dispatch the fetchJobs action
  }, [dispatch]);

  useEffect(() => {
    console.log("Jobs loaded:", jobs); // Log the jobs after they are loaded
  }, [jobs]); // This will run when `jobs` in the store is updated

  const handlePrev = () => {
    if (currentJobIndex > 0) {
      setCurrentJobIndex(currentJobIndex - 3); // Show previous set of jobs
    }
  };

  const handleNext = () => {
    if (currentJobIndex + 3 < jobs.length) {
      setCurrentJobIndex(currentJobIndex + 3); // Show next set of jobs
    }
  };

  const isPrevDisabled = currentJobIndex === 0;
  const isNextDisabled = currentJobIndex + 3 >= jobs.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Jobs</Text>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {/* Show loading indicator while fetching jobs */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#c6a02d" />
        ) : (
          <>
            {/* Slice jobs to show a subset based on current index */}
            {jobs.slice(currentJobIndex, currentJobIndex + 3).map((job) => (
              <JobCard key={job._id} job={job} />
            ))}

            <View style={styles.navButtonsContainer}>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate("Jobs")}
              >
                <Text style={styles.viewAllButtonText}>View All Jobs</Text>
              </TouchableOpacity>

              <View style={styles.navButtons}>
                <TouchableOpacity
                  onPress={handlePrev}
                  disabled={isPrevDisabled}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    color={isPrevDisabled ? "#ccc" : "#c6a02d"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleNext}
                  disabled={isNextDisabled}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={30}
                    color={isNextDisabled ? "#ccc" : "#c6a02d"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
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
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  navButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    flexDirection: "row",
    alignItems: "center",
  },
});

export default JobCards;
