import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { FIREBASE_AUTH } from 'utils/firebase';

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
const auth = FIREBASE_AUTH;

export const Provider = (props: ProviderProps) => {
  const [state, setState] = useState({
    user: null as FirebaseUser | null,
    isAuth: false,
    isLoading: false,
  });
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: FirebaseUser | null) => {
      if (currentUser) {
        setState((prevState) => ({
          ...prevState,
          user: currentUser,
        }));
      }
    });
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    const response = await signInService(email, password);

    setState((prevState) => ({
      ...prevState,
      isLoading: false,
      isAuth: response.success,
      ...response,
    }));

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
    setState((prevState) => ({
      ...prevState,
      isAuth: false,
    }));
  };

  useEffect(() => {
    if (state.user) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [state.user]);

  useEffect(() => {
    if (state.isLoading) return;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !state.isLoading &&
      !state.user
    ) {
      // Redirect to the sign-in page.
      router.push('/sign-in');
    } else if (!state.isLoading && state.user) {
      // Redirect away from the sign-in page.
      router.push('/');
    }
  }, [state]);

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
