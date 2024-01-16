import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error al guardar dato:', error);
  }
};

export const getItemFor = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error('Error al obtener dato:', error);
  }
};

export const removeItemFor = async (key: string) => {
  try {
    await AsyncStorage.getItem(key);
  } catch (error) {
    console.error('Error al remover dato:', error);
  }
};
