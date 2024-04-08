import AsyncStorageRN from "@react-native-async-storage/async-storage";

class AsyncStorage {
  static setItem = async (key, value) => {
    try {
      await AsyncStorageRN.setItem(key, value);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  static getItem = async (key, defaultValue = null) => {
    try {
      const response = await AsyncStorageRN.getItem(key);

      return response ? JSON.parse(response) : defaultValue;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  static removeItem = async (key) => {
    try {
      await AsyncStorageRN.removeItem(key);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

export default AsyncStorage;
