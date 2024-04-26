export interface IShop {
  uid: string;
  name: string;
  description: string;
  category: string;
  contactInfo: string;
  createdAt: Date;
  editedAt: Date;
  ownerID: string;
  location: number[];
  avatarURL: string;
}
