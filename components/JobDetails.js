import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import emailjs from "emailjs-com";
import Constants from "expo-constants";

const JobDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.coverLetter) {
      alert("Please fill out all fields.");
      return;
    }

    // Access environment variables stored in app.json via expo-constants
    const serviceID = Constants.manifest.extra.EMAILJS_SERVICE_ID;
    const templateID = Constants.manifest.extra.EMAILJS_TEMPLATE_ID;
    const publicKey = Constants.manifest.extra.EMAILJS_PUBLIC_KEY;

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      cover_letter: formData.coverLetter,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      (result) => {
        console.log("Email sent successfully:", result.text);
        alert("Your application has been submitted successfully!");
        setFormData({ name: "", email: "", coverLetter: "" }); // Reset form
      },
      (error) => {
        console.error("Error sending email:", error);
        alert("Failed to submit application. Please try again.");
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Job Details</Text>

      {/* Static Job Details Content */}
      <Text style={styles.jobTitle}>Frontend Developer</Text>
      <Text style={styles.jobDescription}>
        Work with modern frontend frameworks to build engaging user interfaces.
      </Text>
      <Text style={styles.experience}>Years of Experience: 2+</Text>
      <Text style={styles.location}>Location: New York, NY</Text>
      <Text style={styles.postedDate}>Date Posted: 2025-04-20</Text>

      {/* Key Responsibilities Section */}
      <Text style={styles.sectionTitle}>Key Responsibilities:</Text>
      <Text style={styles.bulletPoint}>
        • Develop UI components using React
      </Text>
      <Text style={styles.bulletPoint}>• Collaborate with backend team</Text>
      <Text style={styles.bulletPoint}>• Optimize application performance</Text>

      {/* Skills & Experience Section */}
      <Text style={styles.sectionTitle}>Skills & Experience:</Text>
      <Text style={styles.bulletPoint}>• Proficiency in JavaScript, React</Text>
      <Text style={styles.bulletPoint}>• Understanding of REST APIs</Text>
      <Text style={styles.bulletPoint}>• 2+ years in frontend development</Text>

      {/* Perks & Benefits Section */}
      <Text style={styles.sectionTitle}>Perks & Benefits:</Text>
      <Text style={styles.bulletPoint}>• Health insurance</Text>
      <Text style={styles.bulletPoint}>• Remote work options</Text>
      <Text style={styles.bulletPoint}>• Stock options</Text>

      {/* Job Application Form */}
      <Text style={styles.formTitle}>Apply for this Job</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={formData.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Cover Letter"
        value={formData.coverLetter}
        onChangeText={(text) => handleInputChange("coverLetter", text)}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Application</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacing}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  jobTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  jobDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  experience: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 6,
  },
  location: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 6,
  },
  postedDate: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 6,
  },
  bulletPoint: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 4,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#c6a02d",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomSpacing: {
    height: 40,
  },
});

export default JobDetails;
