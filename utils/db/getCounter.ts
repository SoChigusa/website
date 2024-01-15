import { doc, getDoc } from "firebase/firestore"
import { database } from "./index"

const getCounter = async ({ collection, document }: { collection: any, document: any }) => {
  const docRef = doc(database, collection, document);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('Document not found for collection ', collection, ', document ', document);
    return {};
  }
}

export default getCounter;