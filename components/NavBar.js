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

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  const toggleMenu = () => {
    if (!menuOpen) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
    setMenuOpen(!menuOpen);
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
          <TouchableOpacity>
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
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post a Job</Text>
        </TouchableOpacity>
      </Animated.View>
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
    fontFamily: "OpenSans-Bold", // Open Sans for logo
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
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
    fontFamily: "Montserrat-Regular", // Montserrat for links
  },
  postButton: {
    backgroundColor: "#c6a02d",
    margin: 16,
    width: 150, // Set a specific width here
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center", // Ensure the text is centered
  },
  postButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Montserrat-Regular", // Montserrat for button text
  },
});


export default NavBar;
