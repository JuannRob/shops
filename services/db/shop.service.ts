import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  QuerySnapshot,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { IShop } from 'ts/interfaces/shop.interface';
import { FIREBASE_DB } from 'utils/firebase';

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
    shopsSnap.docs.forEach((shop) => shops.push(shop.data() as IShop));

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
