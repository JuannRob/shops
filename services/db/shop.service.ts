import {
  collection,
  getDocs,
  doc,
  getDoc,
  QuerySnapshot,
  DocumentSnapshot,
} from 'firebase/firestore';
import { IShop, IShopFromDB } from 'ts/interfaces/shop.interface';
import { FIREBASE_DB } from 'utils/firebase';
import { fetchDocValue } from './helpers';
import { handleError } from 'utils/handleError';

const db = FIREBASE_DB;
const shopsRef = collection(db, 'shops');

export async function fetchShops(): Promise<IShop[]> {
  try {
    const shopsSnap: QuerySnapshot = await getDocs(shopsRef);
    const shops: IShop[] = [];

    if (!shopsSnap.empty) {
      shopsSnap.docs.forEach((shopDoc) => {
        const shopData = shopDoc.data() as IShopFromDB;
        const shop: IShop = {
          uid: shopDoc.id,
          categoryName: shopData.categoryRef,
          ownerName: shopData.ownerRef,
          name: shopData.name,
          description: shopData.description,
          contactInfo: shopData.contactInfo,
          createdAt: shopData.createdAt.toDate(),
          editedAt: shopData.editedAt.toDate(),
          location: shopData.location,
          avatarURL: shopData.avatarURL,
        };
        shops.push(shop);
      });
    }

    return shops;
  } catch (error) {
    handleError(error as Error);
  }
}

export async function getShopById(id: string): Promise<IShop> {
  try {
    const shopRef = doc(shopsRef, id);
    const shopSnap: DocumentSnapshot = await getDoc(shopRef);
    if (shopSnap.exists()) {
      const shopData = shopSnap.data() as IShopFromDB;
      const shop: IShop = {
        uid: id,
        categoryName: shopData.categoryRef,
        ownerName: shopData.ownerRef,
        name: shopData.name,
        description: shopData.description,
        contactInfo: shopData.contactInfo,
        createdAt: shopData.createdAt.toDate(),
        editedAt: shopData.editedAt.toDate(),
        location: shopData.location,
        avatarURL: shopData.avatarURL,
      };

      shop.categoryName = await fetchDocValue(shopData.categoryRef, 'title');
      shop.ownerName = await fetchDocValue(shopData.ownerRef, 'displayName');

      return shop;
    } else {
      handleError(`Shop with id '${id}' does not exist.`);
    }
  } catch (error) {
    handleError(error as Error);
  }
}
