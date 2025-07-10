import React from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebase.config";
import { useEffect } from "react";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // logout
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/role/${
              currentUser.email
            }`
          );
          const data = await res.json();
          setUser({
            ...currentUser,
            role: data.role || "user",
            displayName: data.username || currentUser.displayName,
            photoURL: data.photo || currentUser.photoURL,
          });
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUser({
            ...currentUser,
            role: "user",
            displayName: currentUser.displayName || "Anonymous",
            photoURL: currentUser.photoURL || "",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    createUser,
    signIn,
    googleLogin,
    user,
    loading,
    logOutUser,
    githubLogin,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
