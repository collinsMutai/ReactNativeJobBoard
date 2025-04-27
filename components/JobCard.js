import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const JobCard = ({ job }) => {
  return (
    <View style={styles.card}>
      <View style={styles.item}>
        <Image source={{ uri: job.image }} style={styles.avatar} />
        <View style={styles.label}>
          <Text style={styles.title}>{job.title}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.jobDescription}>{job.description}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.viewMoreButton}>
            <Text style={styles.viewMoreText}>View More</Text>
          </TouchableOpacity>
          <Text style={styles.datePosted}>{job.postedDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // for Android shadow
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  label: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardContent: {
    marginTop: 12,
  },
  jobDescription: {
    fontSize: 16,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  viewMoreButton: {
    backgroundColor: "#c6a02d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  viewMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
  datePosted: {
    fontSize: 12,
    color: "#888",
  },
});

export default JobCard;
