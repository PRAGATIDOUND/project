import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  const Config = {
    apiKey: "AIzaSyDAm023kMH6wvCdXh-Cakyj9_iPNUP71B0",
    authDomain: "images-7ae3b.firebaseapp.com",
    projectId: "images-7ae3b",
    storageBucket: "images-7ae3b.appspot.com",
    messagingSenderId: "693792271762",
    appId: "1:693792271762:web:749e91431bc29b3d9da54b",
    measurementId: "G-D7GX9PYPLP"
  };
 export const app=initializeApp(Config);
 export const storage= getStorage(app)
