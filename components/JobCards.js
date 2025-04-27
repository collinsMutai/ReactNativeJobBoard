import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import JobCard from "./JobCard"; // Import the JobCard component

const JobCards = () => {
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
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default JobCards;
