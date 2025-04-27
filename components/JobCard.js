import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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

  const handlePrev = () => {
    setCurrentJobIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 3 : jobs.length - 3
    );
  };

  const handleNext = () => {
    setCurrentJobIndex((prevIndex) =>
      prevIndex < jobs.length - 3 ? prevIndex + 3 : 0
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Jobs</Text>

      {/* Show job cards stacked vertically */}
      <ScrollView>
        {jobs.slice(currentJobIndex, currentJobIndex + 3).map((job, index) => (
          <View key={index} style={styles.jobCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.jobTitle}>{job.title}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.jobDescription}>{job.description}</Text>
              <Text style={styles.postedDate}>{job.postedDate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Navigation buttons */}
      <View style={styles.navButtons}>
        <TouchableOpacity onPress={handlePrev}>
          <Ionicons name="chevron-back-outline" size={30} color="#c6a02d" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Ionicons name="chevron-forward-outline" size={30} color="#c6a02d" />
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
    marginBottom: 16,
    textAlign: "center",
  },
  jobCard: {
    backgroundColor: "#f2f2f2",
    marginBottom: 16, // Space between cards
    padding: 16,
    borderRadius: 8,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  cardHeader: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardBody: {
    marginTop: 8,
    alignItems: "center",
  },
  jobDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 12,
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
