import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAsyncUser = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('USER_TOKEN');
        if (userToken !== null) {
          setIsAuthenticated(JSON.parse(userToken));
        }
      } catch (error) {
        console.error('Error al verificar el token de acceso:', error);
      }
    };

    checkUserToken();
  }, []);

  return isAuthenticated;
};
