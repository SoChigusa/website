import { doc, getDoc } from "firebase/firestore"
import { database } from "./index"

const getCounter = async ({ eprint }) => {
  const docRef = doc(database, 'publications', eprint);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('Document not found for eprint ', eprint);
    return {};
  }
}

export default getCounter;