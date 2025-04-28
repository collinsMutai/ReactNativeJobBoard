import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the X icon

const AuthModal = ({ visible, onClose }) => {
  const [authMode, setAuthMode] = useState("login"); // 'login', 'register', 'reset'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuthAction = () => {
    if (authMode === "login") {
      console.log("Logging in with:", email, password);
    } else if (authMode === "register") {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      console.log("Registering with:", email, password);
    } else if (authMode === "reset") {
      console.log("Resetting password for:", email);
    }
  };

  const renderForm = () => {
    switch (authMode) {
      case "login":
        return (
          <View>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleAuthAction} />
            <TouchableOpacity onPress={() => setAuthMode("reset")}>
              <Text style={styles.switchText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAuthMode("register")}>
              <Text style={styles.switchText}>
                Don't have an account? Register
              </Text>
            </TouchableOpacity>
          </View>
        );
      case "register":
        return (
          <View>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Button title="Register" onPress={handleAuthAction} />
            <TouchableOpacity onPress={() => setAuthMode("login")}>
              <Text style={styles.switchText}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        );
      case "reset":
        return (
          <View>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <Button title="Reset Password" onPress={handleAuthAction} />
            <TouchableOpacity onPress={() => setAuthMode("login")}>
              <Text style={styles.switchText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={32} color="#c6a02d" />
          </TouchableOpacity>
          <View style={styles.formContainer}>
            {/* Title placed inside the form container */}
            <Text style={styles.modalTitle}>
              {authMode === "login"
                ? "Login"
                : authMode === "register"
                ? "Register"
                : "Reset Password"}
            </Text>
            {renderForm()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
    position: "absolute", // Ensure the modal background is covering the full screen
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 15, // Reduced padding inside modal for more compact layout
    borderRadius: 10,
    width: "85%", // Increased width of modal container to 85% of screen width
    maxWidth: 400, // Optionally limit the width to a maximum value
    height: "70%", // Modal height covers 70% of the screen
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the close button is on top
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15, // Reduced margin to bring it closer to the form
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingLeft: 10,
    width: "100%", // Input width is set to 100% of modal container width
  },
  switchText: {
    textAlign: "center",
    color: "#007BFF",
    marginTop: 10,
  },
  formContainer: {
    alignItems: "center", // Center form inputs horizontally
    justifyContent: "center", // Center form inputs vertically
    flex: 1, // Use all available space
    width: "100%", // Ensure the form takes up full width of modal container
  },
});

export default AuthModal;
