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
            </View>
          </View>
          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
            <Text style={styles.postedDate}>{job.postedDate}</Text>
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
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
  },
});

export default JobCard;
