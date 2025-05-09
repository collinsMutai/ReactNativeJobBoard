import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";
import Constants from "expo-constants";

const JobDetails = () => {
  const selectedJob = useSelector((state) => state.job.selectedJob);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    cvLink: "", // Added state for CV link
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.coverLetter ||
      !formData.cvLink
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const serviceID = Constants.expoConfig?.extra?.EMAILJS_SERVICE_ID;
    const templateID = Constants.expoConfig?.extra?.EMAILJS_TEMPLATE_ID;
    const publicKey = Constants.expoConfig?.extra?.EMAILJS_PUBLIC_KEY;

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      cover_letter: formData.coverLetter,
      job_title: selectedJob?.title || "Unknown Job",
      cv_link: formData.cvLink, // Send CV link instead of file name
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      () => {
        alert("Your application has been submitted successfully!");
        setFormData({ name: "", email: "", coverLetter: "", cvLink: "" });
      },
      (error) => {
        alert("Failed to submit application. Please try again.");
        console.error("Error sending email:", error);
      }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {selectedJob ? "Job Details" : "No Job Selected"}
      </Text>

      {selectedJob ? (
        <>
          <Text style={styles.jobTitle}>{selectedJob.title}</Text>
          <Text style={styles.jobDescription}>{selectedJob.description}</Text>
          <Text style={styles.experience}>
            Years of Experience: {selectedJob.yearsOfExperience}
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

          {/* Text input for CV link */}
          <TextInput
            style={styles.input}
            placeholder="CV Link (Google Drive/Other)"
            value={formData.cvLink}
            onChangeText={(text) => handleInputChange("cvLink", text)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing}></View>
        </>
      ) : (
        <Text style={styles.noJobText}>
          Please select a job to view details.
        </Text>
      )}
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
  noJobText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default JobDetails;
