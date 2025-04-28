import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AuthModal from "./AuthModal"; // Import the new AuthModal component

const NavBar = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.logo}>Job Board</Text>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons
              name="person-circle-outline"
              size={28}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Render the AuthModal component */}
      <AuthModal visible={isModalVisible} onClose={toggleModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
    backgroundColor: "#fff",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#c6a02d",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 16,
  },
});

export default NavBar;
