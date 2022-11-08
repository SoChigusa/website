import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { database } from './index';

const updateCounter = async ({ n, likedUsers, eprint }) => {
  const docRef = doc(database, 'publications', eprint);
  const docSnap = await getDoc(docRef);
  const updateTimestamp = await updateDoc(docRef, {
    likes: increment(n),
    likedUsers: likedUsers,
  });
};

export default updateCounter;