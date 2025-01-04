// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDLDgz6j0uq_Ae2XIjBkB-b8YbWCTWFqYw",
  authDomain: "banrem-efaac.firebaseapp.com",
  projectId: "banrem-efaac",
  storageBucket: "banrem-efaac.appspot.com",
  messagingSenderId: "599637872126",
  appId: "1:599637872126:web:07510942568cb3eac2c4af",
  measurementId: "G-TLPBMJ38XR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)