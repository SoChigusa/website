import { database } from './index';

const setDatabase = async ({ publications }) => {
  const newPublications = [];

  // constrain the number of requests to MAX_NUMBER_OF_REQUEST
  const MAX_NUMBER_OF_REQUEST = 1;
  const num_pub = publications.length;
  let cnt = 0;
  let promises = [];
  for (let i = 0; i < MAX_NUMBER_OF_REQUEST; i++) {
    let p = new Promise((resolve) => {
      (async function loop(index) {

        if (index < num_pub) {
          const publication = publications[index];
          const eprint = publication.entryTags.EPRINT;

          const data = {
            likes: 0,
            likedUsers: [],
          };
          const docRef = database.collection('publications').doc(eprint);
          const docSnap = await docRef.get();
          if (!docSnap.exists) {
            await docRef.set(data);
          }
          newPublications.push({
            content: publication,
            likes: docSnap.get('likes'),
            likedUsers: docSnap.get('likedUsers'),
          });

          // next
          loop(cnt++);
          return;
        }
        resolve();

      })(cnt++);
    });
    promises.push(p);
  }
  await Promise.all(promises);

  return newPublications;
};

export default setDatabase;