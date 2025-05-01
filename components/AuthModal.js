import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import {
  loginUser,
  registerUser,
  resetPassword,
} from "../redux/actions/authActions";

const AuthModal = ({ visible, onClose }) => {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const currentUser = useSelector((state) => state.auth.currentUser);

  // Effect hook to handle navigation after login
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "admin") {
        navigation.navigate("Admin");
      } else {
        navigation.navigate("Home"); // or some default route
      }
    }
  }, [currentUser, navigation]);

  const handleAuthAction = async () => {
    try {
      if (authMode === "login") {
        if (!email.trim() || !password.trim()) {
          alert("Please fill in both email and password.");
          return;
        }
        await dispatch(loginUser(email, password)); // Dispatch login
        onClose();
        Toast.show({
          type: "success",
          position: "top",
          text1: "Login Successful!",
          text2: "Welcome back!",
          visibilityTime: 3000,
        });
      } else if (authMode === "register") {
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
          alert("Please fill in all fields.");
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        await dispatch(registerUser(email, password));
        onClose();
        Toast.show({
          type: "success",
          position: "top",
          text1: "Registration Successful!",
          text2: "You can now log in.",
          visibilityTime: 3000,
        });
      } else if (authMode === "reset") {
        if (!email.trim()) {
          alert("Please enter your email.");
          return;
        }
        await dispatch(resetPassword(email));
        onClose();
        Toast.show({
          type: "success",
          position: "top",
          text1: "Password Reset!",
          text2: "Please check your email.",
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error!",
        text2: error.message || "Something went wrong.",
        visibilityTime: 3000,
      });
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
            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuthAction}
            >
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuthAction}
            >
              <Text style={styles.authButtonText}>Register</Text>
            </TouchableOpacity>
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
            <TouchableOpacity
              style={styles.authButton}
              onPress={handleAuthAction}
            >
              <Text style={styles.authButtonText}>Reset Password</Text>
            </TouchableOpacity>
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
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={32} color="#c6a02d" />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.modalTitle}>
              {authMode === "login"
                ? "Login"
                : authMode === "register"
                ? "Register"
                : "Reset Password"}
            </Text>
            {renderForm()}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    width: "85%",
    maxWidth: 400,
    maxHeight: "90%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingLeft: 10,
    width: 250,
  },
  switchText: {
    textAlign: "center",
    color: "#c6a02d",
    marginTop: 10,
  },
  formContainer: {
    paddingHorizontal: 10,
    paddingBottom: 40,
    alignItems: "center",
  },
  authButton: {
    backgroundColor: "#c6a02d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AuthModal;
