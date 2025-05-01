import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";

const NavBar = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLinkPress = (route) => {
    toggleMenu();
    navigation.navigate(route);
  };

  const menuHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 220],
  });

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.logo}>Job Board</Text>
        <View style={styles.rightIcons}>
          {currentUser && (
            <Text style={styles.roleText}>Hello, {currentUser.role}</Text>
          )}
          <TouchableOpacity onPress={toggleModal}>
            <Ionicons
              name="person-circle-outline"
              size={28}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu}>
            <MaterialIcons name="menu" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.dropdown, { height: menuHeight }]}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => handleLinkPress("Home")}
        >
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => handleLinkPress("Jobs")}
        >
          <Text style={styles.linkText}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => handleLinkPress("Profile")}
        >
          <Text style={styles.linkText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post a Job</Text>
        </TouchableOpacity>
      </Animated.View>

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
    fontFamily: "OpenSans-Bold",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  roleText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginRight: 8,
    fontFamily: "Montserrat-Regular",
  },
  icon: {
    marginRight: 16,
  },
  dropdown: {
    overflow: "hidden",
    backgroundColor: "#f7f7f7",
  },
  link: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  linkText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Montserrat-Regular",
  },
  postButton: {
    backgroundColor: "#c6a02d",
    margin: 16,
    width: 150,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat-Regular",
  },
});

export default NavBar;
