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
import { defaultUserAvatar } from 'constants/Media';
import { handleError } from 'utils/handleError';

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
    return {
      success: false,
      response: error as AuthError,
    };
  }
}

export async function signUpService(
  email: string,
  password: string,
  fullName: string
): Promise<AuthResult> {
  try {
    const res: UserCredential | AuthError = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user: User = res.user;
    await updateProfile(user, { displayName: fullName, photoURL: defaultUserAvatar });
    await saveNewUser({
      uid: user.uid,
      phoneNumber: '',
      displayName: fullName,
      photoURL: defaultUserAvatar,
    });
    return {
      success: true,
      response: res as UserCredential,
    };
  } catch (error) {
    return {
      success: false,
      response: error as AuthError,
    };
  }
}

export async function signOutService(): Promise<void> {
  try {
    signOut(auth);
  } catch (error) {
    handleError(error as Error);
  }
}

export function formatAuthError(error: AuthError): string {
  const { code } = error as AuthError;
  let alertMsg: string = '';
  switch (code) {
    case 'auth/invalid-email':
      alertMsg = 'Invalid email';
      break;
    case 'auth/invalid-credential':
      alertMsg = 'Incorrect email or password';
      break;
    case 'auth/user-disabled':
      alertMsg = 'User disabled';
      break;
    case 'auth/user-not-found':
      alertMsg = 'User not found';
      break;
    case 'auth/missing-password':
      alertMsg = 'Missing password';
      break;
    case 'auth/wrong-password':
      alertMsg = 'Wrong password';
      break;
    case 'auth/email-already-in-use':
      alertMsg = 'Email already in use';
      break;
    case 'auth/weak-password':
      alertMsg = 'Weak password';
      break;
    case 'auth/missing-phone-number':
      alertMsg = 'Missing phone number';
      break;
    case 'auth/invalid-phone-number':
      alertMsg = 'Invalid phone number';
      break;
    default:
      alertMsg = 'Unknown error.\nCheck the information provided';
  }

  return alertMsg;
}
