import { doc, getDoc, increment, updateDoc } from 'firebase/firestore';
import { database } from './index';

const updateCounter = async ({ n, likedUsers, id }) => {
  const docRef = doc(database, id.collection, id.document);
  const updateTimestamp = await updateDoc(docRef, {
    likes: increment(n),
    likedUsers: likedUsers,
  });
};

export default updateCounter;