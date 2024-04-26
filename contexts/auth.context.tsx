import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { removeItemFor, storeData } from 'services/storage.service';
import { signInService, signUpService, signOutService, AuthResult } from '../services/auth.service';
import { IFirestoreUser } from 'ts/interfaces/user.interface';

interface AuthContextProps {
  currentUser: IFirestoreUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    phoneNumber: string
  ) => Promise<AuthResult>;
  signOut: () => Promise<void>;
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
  const [userState, setUserState] = useState({
    currentUser: null as IFirestoreUser | null,
    isLoading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      if (currentUser !== null) {
        //TODO: Acá meter un fetch del user actual y guardar en context la versión de firestore
        storeData('userCredential', JSON.stringify(currentUser));
        setUserState((prevState) => ({
          ...prevState,
          currentUser: currentUser as IFirestoreUser,
          isLoading: false,
        }));
      } else {
        removeItemFor('userCredential');
        setUserState((prevState) => ({
          ...prevState,
          currentUser: null,
          isLoading: false,
        }));
      }
    });

    return unsubscribe;
  }, [userState.currentUser]);

  return (
    <AuthContext.Provider
      value={{
        ...userState,
        signIn: signInService,
        signUp: signUpService,
        signOut: signOutService,
      }}>
      {!userState.isLoading && props.children}
    </AuthContext.Provider>
  );
};
