import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import auth from "../firebase/firebase.init";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([null]);
    const [loading, setLoading] = useState(false);
    // user creationg with email and password
    const createNewUserWithEmailPass = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    };

    // user creation with google popup
    const provider = new GoogleAuthProvider();
    const createNewUserWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    // set auth observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // sign in user using email and password
    const signinUserWithEmailPass = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    };

    // sign out user
    const userSignOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    const authInfo = {
        user,
        loading,
        createNewUserWithEmailPass,
        createNewUserWithGoogle,
        signinUserWithEmailPass,
        userSignOut
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
