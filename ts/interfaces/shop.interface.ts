import { Timestamp } from 'firebase/firestore';

export interface IShopFromDB {
  avatarURL: string;
  categoryRef: string;
  contactInfo: string;
  createdAt: Timestamp;
  description: string;
  editedAt: Timestamp;
  location: [string, string];
  name: string;
  ownerRef: string;
}

export interface IShop {
  avatarURL: string;
  categoryName: string;
  contactInfo: string;
  createdAt: Date;
  description: string;
  editedAt: Date;
  location: [string, string];
  name: string;
  ownerName: string;
  uid: string;
}
