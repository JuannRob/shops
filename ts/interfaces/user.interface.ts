// authTypes.ts
interface FirebaseUser {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerData?: FirebaseUserInfo[] | null;
  refreshToken?: string | null;
}

interface FirebaseUserInfo {
  displayName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  photoURL?: string | null;
  providerId?: string;
  uid?: string;
}

export default FirebaseUser;
