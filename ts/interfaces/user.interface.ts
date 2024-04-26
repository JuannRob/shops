export interface IFirestoreUser {
  uid: string;
  fullName?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  phoneNumber?: string | null;
  photoURL?: string | null;
}
