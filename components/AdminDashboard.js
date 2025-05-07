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
import { addJob, updateJob, deleteJob } from "../redux/actions/jobActions";
import Toast from "react-native-toast-message";
import NavBar from "./NavBar";
import Footer from "./Footer";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => Object.values(state.job.jobs));

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editJobId, setEditJobId] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [imageUri, setImageUri] = useState("");

  const initialFormState = {
    title: "",
    category: "",
    image: "",
    description: "",
    yearsOfExperience: "",
    location: "",
    keyResponsibilities: "",
    skillsAndExperience: "",
    perksAndBenefits: "",
  };

  const [form, setForm] = useState(initialFormState);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const pickedImage = result.assets[0];
      setImageUri(pickedImage.uri);
      setForm({ ...form, image: pickedImage.uri });
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

    const jobData = {
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

    if (isEditing) {
        if (!editJobId || !editJobId._id) {
          console.error("❌ editJobId is null or invalid:", editJobId);
          return;
        }
        console.log("Updating Job with ID:", editJobId._id);
      dispatch(updateJob({ ...jobData, _id: editJobId._id }));
      Toast.show({
        type: "success",
        text1: "Job Updated",
        text2: `${form.title} updated successfully.`,
      });
    } else {
      dispatch(addJob(jobData));
      Toast.show({
        type: "success",
        text1: "Job Posted",
        text2: `${form.title} added successfully.`,
      });
    }

    resetForm();
    setModalVisible(false);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setImageUri("");
    setIsEditing(false);
    setEditJobId(null);
  };

  const startEditJob = (job) => {
    setForm({
      title: job.title,
      category: job.category,
      image: job.image,
      description: job.description,
      yearsOfExperience: job.yearsOfExperience?.toString() || "",
      location: job.location,
      keyResponsibilities: job.keyResponsibilities.join(", "),
      skillsAndExperience: job.skillsAndExperience.join(", "),
      perksAndBenefits: job.perksAndBenefits.join(", "),
    });
    setImageUri(job.image);
    setIsEditing(true);
    setEditJobId(job);
    setModalVisible(true);
  };

  const confirmDelete = (jobId) => {
    setJobToDelete(jobId);
    setDeleteModalVisible(true);
  };

  const renderJobItem = ({ item }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobCardHeader}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => startEditJob(item)}
            style={styles.iconButton}
          >
            <FontAwesome6 name="edit" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => confirmDelete(item._id)}
            style={styles.iconButton}
          >
            <Feather name="trash-2" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
      <Text>
        {item.category} | {item.location}
      </Text>
      <Text style={styles.postedDate}>Posted: {item.postedDate}</Text>
    </View>
  );

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <NavBar />
        <Text style={styles.dashboardTitle}>Admin Dashboard</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          <Text style={styles.addButtonText}>+ Add New Job</Text>
        </TouchableOpacity>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item._id}
          renderItem={renderJobItem}
          contentContainerStyle={{ padding: 20 }}
        />

        <Footer />
      </ScrollView>

      {/* Add / Edit Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.title}>
            {isEditing ? "Edit Job" : "Add New Job"}
          </Text>
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
          <View style={styles.imageInputContainer}>
            <TextInput
              placeholder={fieldLabels.image}
              style={styles.input}
              value={form.image}
              onChangeText={(text) => handleChange("image", text)}
            />
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={pickImage}
            >
              <Text style={styles.imagePickerText}>Pick Image</Text>
            </TouchableOpacity>
          </View>
          {imageUri ? (
            <View style={styles.imagePreviewContainer}>
              <Text>Image Preview:</Text>
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            </View>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isEditing ? "Update Job" : "Post Job"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#aaa", marginTop: 10 }]}
            onPress={() => {
              resetForm();
              setModalVisible(false);
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>
              Are you sure you want to delete this job?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: "red", flex: 1, marginRight: 10 },
                ]}
                onPress={() => {
                  dispatch(deleteJob(jobToDelete));
                  setDeleteModalVisible(false);
                  setJobToDelete(null);
                }}
              >
                <Text style={styles.buttonText}>Yes, Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#aaa", flex: 1 }]}
                onPress={() => {
                  setDeleteModalVisible(false);
                  setJobToDelete(null);
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  },
  jobCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  jobCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconRow: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 10,
  },
  postedDate: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  modalContent: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    padding: 10,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  imageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: "#c6a02d",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontSize: 16,
  },
  imagePreviewContainer: {
    marginBottom: 20,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  confirmBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});


export default AdminDashboard;
