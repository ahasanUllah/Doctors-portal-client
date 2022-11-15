import React, { createContext, useEffect, useState } from 'react';
import {
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signOut,
   updateProfile,
} from 'firebase/auth';
import app from '../Firebase/firebase.config';
import { current } from 'daisyui/src/colors';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [loader, setLoader] = useState(true);
   //CreateUser
   const createUser = (email, password) => {
      setLoader(false);
      return createUserWithEmailAndPassword(auth, email, password);
   };
   //Update User
   const updateUser = (name) => {
      return updateProfile(auth.currentUser, {
         displayName: name,
      });
   };
   //Login user
   const login = (email, password) => {
      setLoader(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   //Logout user
   const logout = () => {
      return signOut(auth);
   };

   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
         setLoader(false);
         console.log('current user', currentUser);
      });
      return () => unSubscribe();
   }, []);
   const authInfo = {
      createUser,
      login,
      user,
      logout,
      updateUser,
      loader,
   };
   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
