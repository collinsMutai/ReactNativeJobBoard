// components/AdminDashboard.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/actions/jobActions";
import { v4 as uuidv4 } from "uuid";
import Toast from "react-native-toast-message";

const AdminDashboard = () => {
  const dispatch = useDispatch();

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
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Admin: Post a New Job</Text>

      {[
        "title",
        "category",
        "image",
        "description",
        "yearsOfExperience",
        "location",
        "keyResponsibilities",
        "skillsAndExperience",
        "perksAndBenefits",
      ].map((field) => (
        <TextInput
          key={field}
          placeholder={field
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
          style={styles.input}
          value={form[field]}
          onChangeText={(text) => handleChange(field, text)}
        />
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Post Job</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#c6a02d",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AdminDashboard;
