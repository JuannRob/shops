import { DocumentReference, DocumentSnapshot, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from 'utils/firebase';
import { handleError } from 'utils/handleError';

const db = FIREBASE_DB;

export async function fetchDoc(docPath: DocumentReference | string): Promise<DocumentSnapshot> {
  const docRef: DocumentReference = parseDocPath(docPath);
  try {
    const docSnapshot: DocumentSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      handleError(`Document at path '${docPath}' does not exist.`);
    }
    return docSnapshot;
  } catch (error) {
    handleError(error as Error);
  }
}

export async function fetchDocValue(
  docPath: DocumentReference | string,
  propName: string
): Promise<any> {
  const docRef: DocumentReference = parseDocPath(docPath);
  try {
    const doc = await fetchDoc(docRef);
    return doc.data()![propName];
  } catch (error) {
    handleError(error as Error);
  }
}

function parseDocPath(docPath: DocumentReference | string): DocumentReference {
  return docPath instanceof DocumentReference ? docPath : doc(db, docPath);
}
