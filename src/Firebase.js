import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = { apiKey: "AIzaSyAe2Aw4qrqDHLGO3a1TIsT2BgCjqrsEeEE", authDomain: "startupgreeks.firebaseapp.com", projectId: "startupgreeks", storageBucket: "startupgreeks.appspot.com", messagingSenderId: "1052080727159", appId: "1:1052080727159:web:8f7f39443f20e369301272", measurementId: "G-YQQCZJH31T" };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
