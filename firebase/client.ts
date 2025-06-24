// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdJx--x3OuASN1y1W-WLTvTO7_7GINZdM",
  authDomain: "fire-homes-course-bc4bc.firebaseapp.com",
  projectId: "fire-homes-course-bc4bc",
  storageBucket: "fire-homes-course-bc4bc.firebasestorage.app",
  messagingSenderId: "805994910840",
  appId: "1:805994910840:web:7aee1b2b1f69fb8cf4898d",
};

// Initialize Firebase
const currentApp = getApps();
let auth:  Auth;
let storage: FirebaseStorage;

if (!currentApp.length) {
  // If no apps are initialized, initialize a new app
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApp[0];
  auth = getAuth(app);
  storage = getStorage(app); 
}

export { auth, storage };