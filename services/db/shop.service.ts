import {
  collection,
  getDocs,
  doc,
  getDoc,
  QuerySnapshot,
  DocumentSnapshot,
  setDoc,
} from 'firebase/firestore';
import { IShop, IShopFromDB } from 'ts/interfaces/shop.interface';
import { FIREBASE_DB } from 'utils/firebase';
import { getValueFromDoc } from './helpers';

export interface ShopsResponse {
  success: boolean;
  response: IShop | IShop[] | null;
}

const db = FIREBASE_DB;
const shopsRef = collection(db, 'shops');

export async function getShops(): Promise<any> {
  const shopsSnap: QuerySnapshot = await getDocs(shopsRef);

  if (!shopsSnap.empty) {
    const shops: IShop[] = [];
    const promises: Promise<void>[] = [];

    shopsSnap.docs.forEach((shopDoc) => {
      const shopData = shopDoc.data() as IShopFromDB;
      const newShop: IShop = {
        uid: shopDoc.id,
        categoryName: '',
        ownerName: '',
        name: shopData.name,
        description: shopData.description,
        contactInfo: shopData.contactInfo,
        createdAt: shopData.createdAt,
        editedAt: shopData.editedAt,
        location: shopData.location,
        avatarURL: shopData.avatarURL,
      };

      const categoryPromise = getValueFromDoc(shopData.categoryRef, 'name')
        .then((categoryName) => (newShop.categoryName = categoryName))
        .catch(() => (newShop.categoryName = 'Undefined category'));

      const ownerPromise = getValueFromDoc(shopData.ownerRef, 'fullName')
        .then((ownerName) => (newShop.ownerName = ownerName))
        .catch(() => (newShop.ownerName = 'Undefined owner'));

      promises.push(categoryPromise, ownerPromise);
      shops.push(newShop);
    });

    await Promise.all(promises);

    return {
      success: true,
      response: shops,
    };
  } else {
    return {
      success: false,
      response: null,
    };
  }
}

export async function getShopById(id: string): Promise<ShopsResponse> {
  const userRef = doc(shopsRef, id);
  const userSnap: DocumentSnapshot = await getDoc(userRef);
  if (userSnap.exists()) {
    const data = userSnap.data() as IShop;
    return {
      success: true,
      response: data,
    };
  } else {
    return {
      success: false,
      response: null,
    };
  }
}
