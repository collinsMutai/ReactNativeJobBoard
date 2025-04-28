import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

const JobDetails = () => {
  const selectedJob = useSelector((state) => state.job.selectedJob); // Corrected path

  if (!selectedJob) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>No job selected</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: selectedJob.image }} style={styles.jobImage} />
      <Text style={styles.jobTitle}>{selectedJob.title}</Text>
      <Text style={styles.jobDescription}>{selectedJob.description}</Text>
      <Text style={styles.experience}>
        Years of Experience: {selectedJob.yearsOfExperience}+
      </Text>
      <Text style={styles.location}>Location: {selectedJob.location}</Text>
      <Text style={styles.postedDate}>
        Date Posted: {selectedJob.postedDate}
      </Text>

      <Text style={styles.sectionTitle}>Key Responsibilities:</Text>
      {selectedJob.keyResponsibilities?.map((item, index) => (
        <Text key={index} style={styles.bulletPoint}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Skills & Experience:</Text>
      {selectedJob.skillsAndExperience?.map((item, index) => (
        <Text key={index} style={styles.bulletPoint}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Perks & Benefits:</Text>
      {selectedJob.perksAndBenefits?.map((item, index) => (
        <Text key={index} style={styles.bulletPoint}>
          • {item}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  placeholder: {
    textAlign: "center", // Keeping this centered in case no job is selected
    marginTop: 50,
    fontSize: 18,
    color: "#888",
  },
  jobImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center", // This keeps the image centered, you can modify this if you want it aligned left too
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "left", // Aligning job title to the left
    marginBottom: 10,
  },
  jobDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "left", // Aligning job description to the left
  },
  experience: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 6,
    textAlign: "left", // Aligning experience text to the left
  },
  location: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 6,
    textAlign: "left", // Aligning location to the left
  },
  postedDate: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 12,
    textAlign: "left", // Aligning posted date to the left
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 6,
    textAlign: "left", // Aligning section titles to the left
  },
  bulletPoint: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
    textAlign: "left", // Aligning bullet points to the left
  },
});

export default JobDetails;
