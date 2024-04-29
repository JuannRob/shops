import { DocumentReference } from 'firebase/firestore';

export interface IShopFromDB {
  name: string;
  description: string;
  categoryRef: DocumentReference;
  contactInfo: string;
  createdAt: Date;
  editedAt: Date;
  ownerRef: DocumentReference;
  location: { latitude: number; longitude: number };
  avatarURL: string;
}

export interface IShop {
  uid: string;
  name: string;
  description: string;
  categoryName: string;
  contactInfo: string;
  createdAt: Date;
  editedAt: Date;
  ownerName: string;
  location: { latitude: number; longitude: number };
  avatarURL: string;
}
