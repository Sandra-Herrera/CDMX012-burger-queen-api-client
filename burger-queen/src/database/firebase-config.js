import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMmnuNBFIrspYDadbqfdeIJvFH8jpBpxo",
  authDomain: "burger-queen-api-client-b4715.firebaseapp.com",
  projectId: "burger-queen-api-client-b4715",
  storageBucket: "burger-queen-api-client-b4715.appspot.com",
  messagingSenderId: "35299945202",
  appId: "1:35299945202:web:3fecba7e21c956e6787e6b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);