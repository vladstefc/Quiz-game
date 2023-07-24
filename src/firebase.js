import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvDGYM1x8OL_JMUZbNN-orAMUby4h_K5o",
  authDomain: "quizy-9a3d3.firebaseapp.com",
  databaseURL:
    "https://quizy-9a3d3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quizy-9a3d3",
  storageBucket: "quizy-9a3d3.appspot.com",
  messagingSenderId: "368348378551",
  appId: "1:368348378551:web:6a301eb9d603f99ed96432",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
