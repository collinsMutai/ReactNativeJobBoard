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
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../redux/actions/jobActions";
import Toast from "react-native-toast-message";
import NavBar from "./NavBar";
import Footer from "./Footer";
import * as ImagePicker from "expo-image-picker";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => Object.values(state.job.jobs));
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(""); // For uploaded image URI

  // Form state
  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "", // Default value to empty string for image URI
    description: "",
    yearsOfExperience: "",
    location: "",
    keyResponsibilities: "",
    skillsAndExperience: "",
    perksAndBenefits: "",
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // Image selection
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
      base64: false, // Set to false to avoid base64 encoding
    });

    console.log("Image picker result:", result); // Log the result of the image picker
    

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const pickedImage = result.assets[0];
      console.log("Picked image:", pickedImage.uri); // Log the URI of the picked image
      setImageUri(pickedImage.uri); // Save full URI of the image
      setForm({ ...form, image: pickedImage.uri }); // Update form with the image URI
    }
  };

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

    console.log("Submitting job with image URI:", newJob);

    dispatch(addJob(newJob)); // Assuming addJob handles the image URI in the job data

    Toast.show({
      type: "success",
      text1: "Job Posted",
      text2: `${newJob.title} added successfully.`,
    });

    // Reset form
    setForm({
      title: "",
      category: "",
      image: "", // Reset image URI to empty string
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
    image: "Image URI",
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
                value={form[field]} // Ensure the field always has a value
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

          {/* Image URI input and picker next to it */}
          <View style={styles.imageInputContainer}>
            <TextInput
              placeholder={fieldLabels.image}
              style={styles.input}
              value={form.image} // Ensure image field is controlled
              onChangeText={(text) => handleChange("image", text)}
            />
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              <Text style={styles.imagePickerText}>Pick Image</Text>
            </TouchableOpacity>
          </View>

          {/* Display selected image preview */}
          {imageUri ? (
            <View style={styles.imagePreviewContainer}>
              <Text>Image Preview:</Text>
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            </View>
          ) : null}

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
  imageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerButton: {
    backgroundColor: "#c6a02d",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreviewContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 8,
  },
});

export default AdminDashboard;
