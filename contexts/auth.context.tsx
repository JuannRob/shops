import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInService, signUpService, signOutService, AuthResult } from '../services/auth.service';
import { getUserById } from 'services/db/user.service';
import { IUser } from 'ts/interfaces/user.interface';
import { handleError } from 'utils/handleError';

interface AuthContextProps {
  currentUser: IUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, fullName: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    handleError('useAuth must be used within an AuthContextProvider');
  }

  return authContext;
};

const auth = getAuth();
export const Provider = (props: ProviderProps) => {
  const [userState, setUserState] = useState({
    currentUser: null as IUser | null,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // authUser's interface is incorrect in Firebase
        // @ts-ignore
        setUserState((prevState) => ({
          ...prevState,
          currentUser: authUser,
          isLoading: false,
        }));

        updateUserdata(authUser.uid);
      } else {
        setUserState((prevState) => ({
          ...prevState,
          currentUser: null,
          isLoading: false,
        }));
      }
    });

    return unsubscribe;
  }, []);

  async function updateUserdata(uid: string) {
    const { phoneNumber, displayName, photoURL } = await getUserById(uid);
    setUserState((prevState) => ({
      ...prevState,
      currentUser: { ...prevState.currentUser!, phoneNumber, displayName, photoURL },
    }));
  }

  return (
    <AuthContext.Provider
      value={{
        ...userState,
        signIn: signInService,
        signUp: signUpService,
        signOut: signOutService,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};
