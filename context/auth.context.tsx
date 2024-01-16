import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getItemFor, removeItemFor, storeData } from 'services/storage.service';

import { signInService, signUpService, signOutService, AuthResult } from '../services/user.service';
import FirebaseUser from '../ts/interfaces/user.interface';

interface AuthContextProps {
  user: FirebaseUser | null; // Change the type accordingly
  isAuth: boolean;
  isLoading: boolean;
  signInContext: (email: string, password: string) => Promise<AuthResult>;
  signUpContext: (email: string, password: string, displayName: string) => Promise<AuthResult>;
  signOutContext: () => Promise<void>;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return authContext;
};

const auth = getAuth();

export const Provider = (props: ProviderProps) => {
  const [state, setState] = useState({
    user: null as FirebaseUser | null,
    isAuth: false,
    isLoading: false,
  });

  useEffect(() => {
    // Función asincrónica para cargar el usuario desde AsyncStorage
    const loadUserFromStorage = async () => {
      try {
        const userString = await getItemFor('userCredential');
        if (userString) {
          console.log('userString: ', userString);

          const parsedUser: FirebaseUser = JSON.parse(userString);
          setState((prevState) => ({
            ...prevState,
            user: parsedUser,
            isAuth: true,
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error('Error al cargar el usuario desde AsyncStorage:', error);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      }
    };

    // Llama a la función para cargar el usuario desde AsyncStorage
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    // onAuthStateChanged para gestionar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      if (currentUser !== null) {
        storeData('userCredential', JSON.stringify(currentUser));
        setState((prevState) => ({
          ...prevState,
          user: currentUser,
          isAuth: true,
          isLoading: false,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          user: null,
          isAuth: false,
          isLoading: false,
        }));
      }
    });

    // Limpieza del efecto
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const response: AuthResult = await signInService(email, password);

    if ('user' in response.response) {
      const userFromCredential: FirebaseUser = response.response.user;
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isAuth: response.success,
        user: userFromCredential,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isAuth: response.success,
      }));
    }

    return response;
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<AuthResult> => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const response = await signUpService(email, password, displayName);
    setState((prevState) => ({
      ...prevState,
      isLoading: false,
    }));
    return response;
  };

  const logout = async (): Promise<void> => {
    await signOutService();
    removeItemFor('userCredential');
    setState((prevState) => ({
      ...prevState,
      isAuth: false,
    }));
  };

  useEffect(() => {
    if (state.user) {
      console.log('User state: ', state.user);

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signInContext: login,
        signUpContext: register,
        signOutContext: logout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
