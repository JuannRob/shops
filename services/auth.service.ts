import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
  AuthError,
} from 'firebase/auth';
import { FIREBASE_AUTH } from 'utils/firebase';
import { saveNewUser } from './db/user.service';
import { User } from 'firebase/auth';

export interface AuthResult {
  success: boolean;
  response: UserCredential | AuthError;
}

const auth = FIREBASE_AUTH;

export async function signInService(email: string, password: string): Promise<AuthResult> {
  try {
    const res: UserCredential | AuthError = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      response: res as UserCredential,
    };
  } catch (error) {
    console.log('Error en signIn: ', error);
    return {
      success: false,
      response: error as AuthError,
    };
  }
}

export async function signUpService(
  email: string,
  password: string,
  displayName: string,
  phoneNumber: string
): Promise<AuthResult> {
  try {
    const res: UserCredential | AuthError = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user: User = res.user;
    await updateProfile(user, { displayName });
    await saveNewUser({ ...user, phoneNumber: phoneNumber });

    console.log('Respuesta en signUp: ', res);
    return {
      success: true,
      response: res as UserCredential,
    };
  } catch (error) {
    console.log('Error en signUp: ', error);
    return {
      success: false,
      response: error as AuthError,
    };
  }
}

export async function signOutService(): Promise<void> {
  try {
    signOut(auth);
    console.log('Respuesta en signOut: ', 'Sesión finalizada');
  } catch (error) {
    console.log('Error en signUp: ', error);
  }
}
