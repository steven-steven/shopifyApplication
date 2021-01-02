import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { auth, db } from '../../config/firebase';

// Provider hook that creates an auth object and handles it's state.
// returns the state/functions to our useContext provider
const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const createUser = (user) => {
    // upload the user data to Firestore
    return db
      .collection('users')
      .doc(user.uid)
      .set(user)
      .then(() => {
        setUser(user);
        return user;
      })
      .catch((error) => {
        return { error };
      });
  };

  const getUserAdditionalData = (user) => {
    return db
      .collection('users')
      .doc(user.uid)
      .get()
      .then((userData) => {
        console.log('datatbase user');
        if (userData.data()) {
          console.log(userData.data());
          setUser(userData.data());
        }
      });
  };

  const signUp = ({ name, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        auth.currentUser.sendEmailVerification();
        return createUser({ uid: response.user.uid, email, name });
      })
      .catch((error) => {
        return { error };
      });
  };

  const signIn = ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('logged inn');
        console.log(response.user);
        setUser(response.user);
        getUserAdditionalData(response.user);
        return response.user;
      })
      .catch((error) => {
        console.log(error);
        return { error };
      });
  };

  const signOut = () => {
    return auth.signOut().then(() => setUser(false));
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then((response) => {
      return response;
    });
  };

  // listens to auth changes when users are already logged in
  const handleAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      getUserAdditionalData(user);
    }
  };
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsub();
  }, []);

  // listens to document state when user updates its info
  useEffect(() => {
    if (user?.uid) {
      // Subscribe to user document on mount
      const unsubscribe = db
        .collection('users')
        .doc(user.uid)
        .onSnapshot((doc) => setUser(doc.data()));
      return () => unsubscribe();
    }
  }, []);

  return {
    user,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail
  };
};

const authContext = createContext({ user: {} });
const { Provider } = authContext;

export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}

export const useAuth: any = () => {
  return useContext(authContext);
};