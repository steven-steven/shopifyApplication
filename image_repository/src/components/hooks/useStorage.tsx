import { useState, useEffect } from "react";
import { storage, db } from '../../config/firebase';
import { useAuth } from './useAuth';
import { v4 as uuidv4 } from 'uuid';

export const useStorage = (file) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [userImages, setUserImages] = useState([]);

  const userStorage = storage.ref().child(user.uid);

  const createImage = (imgObj) => {
    // upload the user data to Firestore
    return db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .doc(imgObj.imageId)
      .set(imgObj)
      .catch((error) => {
        return { error };
      });
  };

  // const getUrl = async (imgRef) => {
  //   const url = await imgRef.getDownloadURL();
  //   return url;
  // }

  // const listPaginatedFiles = async () => {
  //   const fileResults = [];
  //   // Fetch the first page of 100.
  //   let firstPage = await userStorage.list({ maxResults: 100 });
  //   await Promise.all(firstPage.items.map(async (itemRef) => {
  //     const url = await getUrl(itemRef);
  //     fileResults.push(url);
  //   }));

  //   // Fetch the second page if there are more elements.
  //   while (firstPage.nextPageToken) {
  //     const secondPage = await userStorage.list({
  //       maxResults: 100,
  //       pageToken: firstPage.nextPageToken,
  //     });
  //     await Promise.all(secondPage.items.map(async (itemRef) => {
  //       const url = await getUrl(itemRef);
  //       fileResults.push(url);
  //     }));
  //     firstPage = secondPage;
  //   }
  //   return fileResults;
  // }

  // Subscribe to all image document in the collection
  useEffect(() => {
    const unsubscribe = db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .onSnapshot((querySnapshot) => {
        const images = [];
        querySnapshot.forEach((doc) => {
          images.push({
            src: doc.data().url,
            thumbnail: doc.data().url,
            thumbnailWidth: 320,
            thumbnailHeight: 212
          });
        })
        console.log('imagess')
        console.log(images);
        setUserImages(images);
      });
    return () => unsubscribe();
  }, []);

  // runs every time the file value changes. Then adds that.
  // unique id for file name?
  useEffect(() => {
    if (file) {
      // storage ref
      const newFileId = uuidv4();
      const storageRef = userStorage.child(newFileId);

      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          // track the upload progress
          let percentage =
            Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          // get the public download img url
          const downloadUrl = await storageRef.getDownloadURL();
          await createImage({ url: downloadUrl, name: file.name, imageId: newFileId })
        }
      );
    }
  }, [file]);

  return { userImages, progress, error };
};