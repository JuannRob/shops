import { FIREBASE_DB } from 'utils/firebase';
import { DocumentSnapshot, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { IFirestoreUser } from 'ts/interfaces/user.interface';
import { handleError } from 'utils/handleError';

const db = FIREBASE_DB;
const usersRef = collection(db, 'users');

export async function saveNewUser(user: IFirestoreUser): Promise<void> {
  try {
    await setDoc(doc(usersRef, user.uid), user);
  } catch (error) {
    handleError(error as Error);
  }
}

export async function getUserById(id: string): Promise<IFirestoreUser> {
  try {
    const userRef = doc(usersRef, id);
    const userSnap: DocumentSnapshot = await getDoc(userRef);
    const userData = userSnap.data() as IFirestoreUser;

    return userData;
  } catch (error) {
    handleError(error as Error);
  }
}
