import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const JobCard = ({ jobs }) => {
  return (
    <>
      {jobs.map((job, index) => (
        <View key={index} style={styles.jobCard}>
          <View style={styles.cardHeader}>
            <Image source={{ uri: job.image }} style={styles.jobImage} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.jobDescription}>{job.description}</Text>

              {/* Align Experience and Location to the left and make italic */}
              <Text style={styles.experience}>
                Years of Experience: {job.yearsOfExperience}+
              </Text>
              <Text style={styles.location}>Location: {job.location}</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
            {/* Make the posted date italic */}
            <Text style={styles.postedDate}>Date Posted: {job.postedDate}</Text>
          </View>
        </View>
      ))}
    </>
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

  // Experience and Location styles inside the same view as description, with italic font style
  experience: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "left", // Align to the left
    fontStyle: "italic", // Make it italic
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "left", // Align to the left
    fontStyle: "italic", // Make it italic
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

  // Added styling for the posted date with italic font style
  postedDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 6, // Added margin for spacing
    textAlign: "center", // Center the date
    fontStyle: "italic", // Make it italic
  },
});

export default JobCard;
