// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


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
const analytics = getAnalytics(app);
export default app;