export interface IFirestoreUser {
  uid: string;
  phoneNumber: string;
  displayName: string;
  photoURL: string;
}

export interface IUser {
  uid: string;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoURL: string;
  createdAt: string;
  lastLoginAt: string;
}
