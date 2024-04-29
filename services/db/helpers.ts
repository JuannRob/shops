import { DocumentReference, DocumentSnapshot, doc, getDoc } from 'firebase/firestore';

export async function getDocFromReference(
  docRef: DocumentReference
): Promise<DocumentSnapshot | null> {
  try {
    const doc: DocumentSnapshot = await getDoc(docRef);
    return doc.exists() ? doc : null;
  } catch (error) {
    console.error('Error while fetching document:', error);
    throw error;
  }
}

export async function getValueFromDoc(docRef: DocumentReference, propName: string): Promise<any> {
  try {
    const doc = await getDocFromReference(docRef);
    if (doc !== null && doc.exists()) {
      return doc.data()[propName];
    } else {
      console.error('Document does not exist or is null.');
      return null;
    }
  } catch (error) {
    console.error('Error while fetching document:', error);
    throw error;
  }
}
