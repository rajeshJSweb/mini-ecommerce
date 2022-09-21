import { getApp,getApps, initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB7V2Kz768mvAw_zG4Op9ILs_9rGX8-fS0",
  authDomain: "resturant-app-8c415.firebaseapp.com",
  projectId: "resturant-app-8c415",
  storageBucket: "resturant-app-8c415.appspot.com",
  messagingSenderId: "802414487048",
  appId: "1:802414487048:web:2725b3c9c08e5ad59853bd"
};

const app =getApps.length>0? getApp():initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)

export {app, firestore, storage}