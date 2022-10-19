import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import database from './index';

const updateCounter = async ({ n, eprint }) => {
  const docRef = doc(database, 'publications', eprint);
  const docSnap = await getDoc(docRef);
  const updateTimestamp = await updateDoc(docRef, {
    likes: increment(n),
  });
};

export default updateCounter;