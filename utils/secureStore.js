import * as Keychain from "react-native-keychain";

// Save token securely in Keychain
export const saveToken = async (token) => {
  try {
    await Keychain.setGenericPassword("auth", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token", error);
  }
};

// Get token from Keychain
export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log("Token retrieved:", credentials.password);
      return credentials.password;
    } else {
      console.log("No token found");
      return null;
    }
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
};

// Delete token from Keychain
export const deleteToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Error deleting token", error);
  }
};
