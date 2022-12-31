import { database } from './index';

const setDatabaseWithDocuments = async ({ collection, documents, extractDocument }) => {

  // constrain the number of requests to MAX_NUMBER_OF_REQUEST
  const MAX_NUMBER_OF_REQUEST = 3;
  const num_pub = documents.length;
  let cnt = 0;
  let promises = [];
  for (let i = 0; i < MAX_NUMBER_OF_REQUEST; i++) {
    let p = new Promise((resolve) => {
      (async function loop(index) {

        if (index < num_pub) {
          const docInfo = documents[index];
          const document = extractDocument(docInfo);

          const data = {
            likes: 0,
            likedUsers: [],
          };
          const docRef = database.collection(collection).doc(document);
          const docSnap = await docRef.get();
          if (!docSnap.exists) {
            await docRef.set(data);
          }

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
};

const setDatabase = async ({ collection, posts, publications }) => {
  if (collection == 'publications') {
    const extractDocument = (document) => {
      return document.entryTags.EPRINT;
    };
    await setDatabaseWithDocuments({ collection, documents: publications, extractDocument });
  } else if (collection == 'posts') {
    const extractDocument = (document) => {
      return document.slug;
    };
    await setDatabaseWithDocuments({ collection, documents: posts, extractDocument });
  }
};

export default setDatabase;