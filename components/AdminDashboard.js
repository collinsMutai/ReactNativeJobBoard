import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../redux/actions/jobActions";
import { v4 as uuidv4 } from "uuid";
import Toast from "react-native-toast-message";
import NavBar from "./NavBar";
import Footer from "./Footer";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => Object.values(state.job.jobs));
  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "",
    description: "",
    yearsOfExperience: "",
    location: "",
    keyResponsibilities: "",
    skillsAndExperience: "",
    perksAndBenefits: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.description || !form.location) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Title, description, and location are required.",
      });
      return;
    }

    const newJob = {
      ...form,
      id: uuidv4(),
      postedDate: new Date().toISOString().split("T")[0],
      yearsOfExperience: parseInt(form.yearsOfExperience || 0),
      keyResponsibilities: form.keyResponsibilities
        .split(",")
        .map((s) => s.trim()),
      skillsAndExperience: form.skillsAndExperience
        .split(",")
        .map((s) => s.trim()),
      perksAndBenefits: form.perksAndBenefits.split(",").map((s) => s.trim()),
    };

    dispatch(addJob(newJob));
    Toast.show({
      type: "success",
      text1: "Job Posted",
      text2: `${newJob.title} added successfully.`,
    });

    setForm({
      title: "",
      category: "",
      image: "",
      description: "",
      yearsOfExperience: "",
      location: "",
      keyResponsibilities: "",
      skillsAndExperience: "",
      perksAndBenefits: "",
    });

    setModalVisible(false);
  };

  const fieldLabels = {
    title: "Job Title",
    category: "Category",
    image: "Image URL",
    description: "Job Description",
    yearsOfExperience: "Years of Experience",
    location: "Location",
    keyResponsibilities: "Key Responsibilities (comma-separated)",
    skillsAndExperience: "Skills and Experience (comma-separated)",
    perksAndBenefits: "Perks and Benefits (comma-separated)",
  };

  const isCommaField = (field) =>
    ["keyResponsibilities", "skillsAndExperience", "perksAndBenefits"].includes(
      field
    );

  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text>
        {item.category} | {item.location}
      </Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        Posted: {item.postedDate}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <NavBar />
        <Text style={styles.dashboardTitle}>Admin Dashboard</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add New Job</Text>
        </TouchableOpacity>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobItem}
          contentContainerStyle={{ padding: 20 }}
        />

        <Footer />
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.title}>Add New Job</Text>

          {Object.keys(form).map((field) => (
            <View key={field} style={styles.inputGroup}>
              <TextInput
                placeholder={fieldLabels[field]}
                style={styles.input}
                value={form[field]}
                onChangeText={(text) => handleChange(field, text)}
                multiline={field === "description"}
              />
              {isCommaField(field) && (
                <Text style={styles.helperText}>
                  Separate multiple values with commas.
                </Text>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Post Job</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#aaa", marginTop: 10 }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#c6a02d",
    padding: 12,
    borderRadius: 5,
    margin: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContent: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  helperText: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#c6a02d",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  jobCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default AdminDashboard;
