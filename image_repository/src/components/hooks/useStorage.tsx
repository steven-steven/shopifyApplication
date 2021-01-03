import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { storage, db } from '../../config/firebase';
import { useAuth } from './useAuth';
import { v4 as uuidv4 } from 'uuid';
import { RepositoryContext, ActionTypes, InitialStateType } from '../context/repositoryContext'

const useStorageProvider = () => {
  const { user } = useAuth();
  const { state, dispatch }: { state: InitialStateType, dispatch: React.Dispatch<any> } = useContext(RepositoryContext);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const userStorage = storage.ref().child(user.uid);
  const userFirestore = db.collection('users').doc(user.uid)

  const createImage = (imgObj) => {
    // upload the meta data to Firestore
    return userFirestore.collection('images')
      .doc(imgObj.imageId)
      .set(imgObj)
      .catch((error) => {
        return { error };
      });
  };

  const deleteImage = (imageId) => {
    // delete the meta data to Firestore
    return userFirestore.collection('images')
      .doc(imageId)
      .delete()
      .catch((error) => {
        return { error };
      });
  };

  // Subscribe to all image document in the collection
  useEffect(() => {
    const unsubscribe = userFirestore.collection('images')
      .onSnapshot((querySnapshot) => {
        const images = [];
        querySnapshot.forEach((doc) => {
          const imageData = doc.data()
          images.push({
            id: imageData.imageId,
            src: imageData.url,
            thumbnail: imageData.url,
            caption: imageData.name,
            thumbnailWidth: imageData.thumbnailWidth || 320,
            thumbnailHeight: imageData.thumbnailHeight || 212
          });
        })
        dispatch({ type: ActionTypes.SET_USER_IMAGES, payload: images });
      });
    return () => unsubscribe();
  }, []);

  const getThumbnailSize = (newFile) => {
    const height = 212;
    let width = 320; // 

    return new Promise<{ width: number, height: number }>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(newFile);
      reader.onerror = reject;
      reader.onload = (function (theFile) {
        var image = new Image();
        image.src = theFile.target.result as string;
        image.onload = () => {
          width = Math.round(image.width * height / image.height); // resize width based on the desired height and mantaining aspect ratio
          resolve({ width, height });
        }
      });
    })
  }
  // runs every time the file value changes. Then adds that.
  // unique id for file name?
  const uploadFiles = (files) => {
    const promises = [];
    files.forEach(async file => {
      // storage ref
      const newFileId = uuidv4();
      const storageRef = userStorage.child(newFileId);
      const uploadTask = storageRef.put(file);
      const { width: thumbnailWidth = 320, height: thumbnailHeight = 212 } = await getThumbnailSize(file);
      promises.push(uploadTask);

      uploadTask.on(
        "state_changed",
        snap => {
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
          await createImage({ url: downloadUrl, name: file.name, imageId: newFileId, thumbnailWidth, thumbnailHeight })
        },
      );
    });
    Promise.all(promises)
      .catch(err => console.log(err.code));
  };

  const deleteSelectedFiles = () => {
    // delete entry in firebase storage, then the metadata in firestore
    const promises = [];
    state.selectedPicsId.forEach(id => {
      const storageRef = userStorage.child(id);
      const deleteTask = storageRef.delete().then(() => {
        return deleteImage(id)
      });
      promises.push(deleteTask);
    });
    Promise.all(promises)
      .then(() => alert('Files Deleted'))
      .catch(err => console.log(err.code));
  }

  return { uploadFiles, deleteSelectedFiles, progress, error };
};

const storageContext = createContext({ progress: null, error: null });
const { Provider } = storageContext;

export function StorageProvider(props: { children: ReactNode }): JSX.Element {
  const storage = useStorageProvider();
  return <Provider value={storage}>{props.children}</Provider>;
}

export const useStorage: any = () => {
  return useContext(storageContext);
};