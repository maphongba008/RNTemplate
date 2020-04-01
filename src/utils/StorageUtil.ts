import AsyncStorage from '@react-native-community/async-storage';

export const AsyncStorageKeys = {};

class StorageUtil {
  get = async <T>(key: string, defaultValue: T | null = null): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) {
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (e) {
      return defaultValue;
    }
  };

  set = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (_) {
      // do nothing
    }
  };
}

export default new StorageUtil();
