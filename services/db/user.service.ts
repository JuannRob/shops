import { FIREBASE_DB } from 'utils/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { IFirestoreUser } from 'ts/interfaces/user.interface';
import { User } from 'firebase/auth';

export interface UserResponse {
  success: boolean;
  response: IFirestoreUser | any;
}

const db = FIREBASE_DB;
const usersRef = collection(db, 'users');

export async function saveNewUser(user: User): Promise<UserResponse> {
  const formattedUser: IFirestoreUser = {
    uid: user.uid,
    fullName: user.displayName ?? null,
    email: user.email ?? null,
    emailVerified: false,
    phoneNumber: user.phoneNumber ?? null,
    photoURL: user.photoURL ?? null,
  };
  try {
    const res: any = await setDoc(doc(usersRef, user.uid), formattedUser);
    return {
      success: true,
      response: res as IFirestoreUser,
    };
  } catch (error) {
    return {
      success: false,
      response: error as any,
    };
  }
}
