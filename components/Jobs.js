import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install expo/vector-icons or use any other icon lib
import JobCard from "./JobCard";

const Jobs = () => {
  const jobs = useSelector((state) => Object.values(state.job?.jobs || {}));
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("latest");

  const toggleFilterDropdown = () => {
    setFilterVisible(!filterVisible);
  };

  const filteredJobs = jobs
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (selectedFilter) {
        case "latest":
          return new Date(b.postedDate) - new Date(a.postedDate);
        case "oldest":
          return new Date(a.postedDate) - new Date(b.postedDate);
        case "experience":
          return b.yearsOfExperience - a.yearsOfExperience;
        case "location":
          return a.location.localeCompare(b.location);
        default:
          return 0;
      }
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {jobs && jobs.length > 0 ? "All Jobs" : "No Jobs Available"}
      </Text>

      {/* Search & Filter Row */}
      <View style={styles.filterRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs by title or description"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={toggleFilterDropdown}
          style={styles.filterIcon}
        >
          <Ionicons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Filter Dropdown */}
      {filterVisible && (
        <View style={styles.dropdown}>
          {["latest", "oldest", "experience", "location"].map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => {
                setSelectedFilter(filter);
                setFilterVisible(false);
              }}
            >
              <Text style={styles.dropdownItem}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Job List */}
      {filteredJobs && filteredJobs.length > 0 ? (
        <ScrollView contentContainerStyle={styles.cardContainer}>
          <JobCard jobs={filteredJobs} />
        </ScrollView>
      ) : (
        <Text style={styles.noJobsText}>No matching jobs found.</Text>
      )}
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
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  filterIcon: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  dropdownItem: {
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
  },
  cardContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  noJobsText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Jobs;
