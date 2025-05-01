import * as SecureStore from "expo-secure-store";

// Save token
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync("userToken", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token", error);
  }
};

// Get token
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      console.log("Token retrieved:", token);
    } else {
      console.log("No token found");
    }
    return token;
  } catch (error) {
    console.error("Error getting token", error);
  }
};
