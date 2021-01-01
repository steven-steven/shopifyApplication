import { useState, useEffect } from "react";
import { storage } from '../../config/firebase';
import { useAuth } from './useAuth';

export const useStorage = (file) => {
  const auth = useAuth();
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const userStorage = storage.ref().child(auth.user.uid);

  const getUrl = async (imgRef) => {
    const url = await imgRef.getDownloadURL();
    return url;
  }

  const listPaginatedFiles = async () => {
    const fileResults = [];
    // Fetch the first page of 100.
    console.log('hi');
    let firstPage = await userStorage.list({ maxResults: 100 });
    await Promise.all(firstPage.items.map(async (itemRef) => {
      const url = await getUrl(itemRef);
      fileResults.push(url);
    }));

    // Fetch the second page if there are more elements.
    while (firstPage.nextPageToken) {
      const secondPage = await userStorage.list({
        maxResults: 100,
        pageToken: firstPage.nextPageToken,
      });
      await Promise.all(secondPage.items.map(async (itemRef) => {
        const url = await getUrl(itemRef);
        fileResults.push(url);
      }));
      firstPage = secondPage;
    }
    return fileResults;
  }

  // runs every time the file value changes. Then adds that.
  // unique id for file name?
  useEffect(() => {
    if (file) {
      // storage ref
      const storageRef = userStorage.child(file.name);

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

          // save the url to local state
          setUrl(downloadUrl);
        }
      );
    }
  }, [file]);

  return { listPaginatedFiles, progress, url, error };
};