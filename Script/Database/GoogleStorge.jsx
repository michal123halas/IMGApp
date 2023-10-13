
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCczGGbKjAsIIW803dUK84XKXKkCvplES0",
    authDomain: "imgapp-1b50a.firebaseapp.com",
    projectId: "imgapp-1b50a",
    storageBucket: "imgapp-1b50a.appspot.com",
    messagingSenderId: "434427295561",
    appId: "1:434427295561:web:41e0f3d4fd68f4f8128c98",
    measurementId: "G-1J0LKGLYP9"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };