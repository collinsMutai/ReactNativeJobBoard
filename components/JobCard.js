import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { selectJob } from "../redux/actions/jobActions"; // Assuming this is the action to select the job

const JobCard = ({ job }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleViewMorePress = () => {
    // Dispatch action to store the selected job in Redux (optional if you're using Redux)
    dispatch(selectJob(job.id));

    // Navigate to JobDetails screen
    navigation.navigate("JobDetails");
  };

  if (!job) {
    return null; // Prevent rendering if job is undefined
  }

  return (
    <View style={styles.jobCard}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: job.image }} style={styles.jobImage} />
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.jobDescription}>{job.description}</Text>
          <Text style={styles.experience}>
            Years of Experience: {job.yearsOfExperience}+
          </Text>
          <Text style={styles.location}>Location: {job.location}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={handleViewMorePress}
        >
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
        <Text style={styles.postedDate}>Date Posted: {job.postedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: "#f2f2f2",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  jobImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 32,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  jobDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  experience: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
    alignItems: "center",
  },
  viewMoreButton: {
    backgroundColor: "#c6a02d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  postedDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
    fontStyle: "italic",
  },
});

export default JobCard;
