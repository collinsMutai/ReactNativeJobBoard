import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for chevron icons

const JobCard = () => {
  const jobs = [
    {
      title: "Frontend Developer",
      image: "https://avatar.iran.liara.run/public/6",
      description:
        "Work with modern frontend frameworks to build engaging user interfaces.",
      postedDate: "Posted on April 20, 2025",
    },
    {
      title: "Backend Developer",
      image: "https://avatar.iran.liara.run/public/girl",
      description: "Design and maintain scalable APIs and backend services.",
      postedDate: "Posted on April 18, 2025",
    },
    {
      title: "UX Designer",
      image: "https://avatar.iran.liara.run/public/32",
      description: "Create user-friendly designs and improve user experience.",
      postedDate: "Posted on April 22, 2025",
    },
    {
      title: "Product Manager",
      image: "https://avatar.iran.liara.run/public/7",
      description: "Lead cross-functional teams to deliver products.",
      postedDate: "Posted on April 21, 2025",
    },
    {
      title: "Marketing Specialist",
      image: "https://avatar.iran.liara.run/public/5",
      description: "Develop and execute marketing strategies.",
      postedDate: "Posted on April 19, 2025",
    },
    {
      title: "Data Scientist",
      image: "https://avatar.iran.liara.run/public/8",
      description: "Analyze large datasets to drive business insights.",
      postedDate: "Posted on April 17, 2025",
    },
  ];

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

      {/* Show job cards stacked vertically */}
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {jobs.slice(currentJobIndex, currentJobIndex + 3).map((job, index) => (
          <View key={index} style={styles.jobCard}>
            <View style={styles.cardHeader}>
              {/* Image on the left, Title and Description on the right */}
              <Image source={{ uri: job.image }} style={styles.jobImage} />
              <View style={styles.jobInfo}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobDescription}>{job.description}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              {/* View More button on the left, Posted Date on the right */}
              <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>View More</Text>
              </TouchableOpacity>
              <Text style={styles.postedDate}>{job.postedDate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handlePrev} disabled={currentJobIndex === 0}>
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
    marginBottom: 30, // Increased margin to add more space between title and cards
    textAlign: "center",
  },
  cardContainer: {
    alignItems: "center",
    paddingBottom: 30, // Add padding to the bottom of the cards section
  },
  jobCard: {
    backgroundColor: "#f2f2f2",
    marginBottom: 16, // Space between cards
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
    marginRight: 32, // Spacing between image and content
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
  navButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
});


export default JobCard;
