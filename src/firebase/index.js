import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth";
import { 
    getFirestore, 
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let firebaseInstance;
let auth;
let db;
let provider;

firebaseInstance ??= initializeApp(firebaseConfig);
db ??= getFirestore(firebaseInstance);
auth ??= getAuth(firebaseInstance);
provider ??= new GoogleAuthProvider();

export const signUpWithCredentials = async (name, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const response = await setUserInfo(email, {name})
        return { success: true, ...response}
    } catch (error) {
        const errorMessage = error.message;
        return { success: false, error: errorMessage };
    }
}

export const signInWithCredentials = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        const response = await getUserinfo(email);
        return { success: true, ...response}
    } catch (error) {
        const errorMessage = error.message;
        return { success: false, error: errorMessage };
    }
}

export const continueWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        // The signed-in user info.
        const user = result.user;
        const docResponse = await setUserInfo(user.email, {name: user.displayName});
        return { success: true , ...docResponse};
    } catch (error) {
        const errorMessage = error.message;
        console.log(error);
        return { success: false, error: errorMessage };
    }
};

export const logOut = async () => {
    try {
        await signOut(auth);
        return {success: true}
    }
    catch (error) {
        return {success: false, error: error.errorMessage}
    }
}

export const setUserInfo = async (email, data) => {
    let isNewUser = true;
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        isNewUser = false;
        console.log("Document data:", docSnap.data());
    } else {
    console.log("No such document!");
    }
    await setDoc(docRef, data, { merge: true });
    return {isNewUser, ...docSnap.data(), ...data, email: docSnap.id};
}

export const getUserinfo = async (email) => {
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return {...docSnap.data(), email: docSnap.id}
    } else {
        console.log("No such document!");
        return null
    }
}