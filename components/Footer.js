import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Importing Ionicons for icons

const Footer = () => {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footer}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Text style={styles.logo}>
          Job <Text style={styles.logoText}>Board</Text>
        </Text>
        <Text style={styles.description}>
          Our platform connects top talent with innovative companies. We aim to
          simplify the hiring process and empower careers.
        </Text>
      </View>

      {/* Menu Links Section */}
      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Menu</Text>
        <TouchableOpacity onPress={() => handleLinkPress("#")}>
          <Text style={styles.menuLink}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress("#")}>
          <Text style={styles.menuLink}>Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress("#")}>
          <Text style={styles.menuLink}>About Us</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={[styles.menuTitle, styles.centerTitle]}>Contact Us</Text>
        <View style={styles.contactRow}>
          <TouchableOpacity onPress={() => handleLinkPress("tel:+11234567890")}>
            <Ionicons name="call-outline" size={24} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.contactText}>+1 (123) 456-7890</Text>
        </View>
        <View style={styles.contactRow}>
          <TouchableOpacity
            onPress={() => handleLinkPress("mailto:contact@yourcompany.com")}
          >
            <Ionicons name="mail-outline" size={24} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.contactText}>contact@yourcompany.com</Text>
        </View>
        <View style={styles.contactRow}>
          <TouchableOpacity
            onPress={() =>
              handleLinkPress("https://maps.google.com/?q=San+Francisco,+CA")
            }
          >
            <Ionicons name="navigate-outline" size={24} style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.contactText}>San Francisco, CA</Text>
        </View>
      </View>

      {/* Social Media Icons */}
      <View style={styles.socialSection}>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://facebook.com")}
        >
          <Ionicons name="logo-facebook" size={30} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://instagram.com")}
        >
          <Ionicons name="logo-instagram" size={30} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLinkPress("https://wa.me/1234567890")}
        >
          <Ionicons name="logo-whatsapp" size={30} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 20,
    paddingHorizontal: 16,
    color: "#333",
    fontFamily: "Open Sans", // Specify font-family if using custom fonts
    alignItems: "center", // Centering all content horizontally
    justifyContent: "center", // Centering content vertically
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    textTransform: "uppercase",
  },
  logoText: {
    color: "#c6a02d",
  },
  description: {
    textAlign: "center",
    maxWidth: 500,
    marginTop: 12,
    fontSize: 16,
  },
  menuSection: {
    textAlign: "center",
    marginVertical: 16,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  menuLink: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#333",
    marginBottom: 8,
  },
  contactSection: {
    textAlign: "center",
    marginVertical: 16,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
    color: "#c6a02d",
  },
  contactText: {
    fontSize: 16,
    color: "#333",
  },
  socialSection: {
    textAlign: "center",
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    color: "#c6a02d",
    marginHorizontal: 10,
    transition: "color 0.3s ease",
  },
  centerTitle: {
    textAlign: "center", // Ensuring the title is centered
  },
});

export default Footer;
