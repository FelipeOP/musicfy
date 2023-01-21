import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJgscHjen9j11FwIniBrH2WWWn186i-jI",
  authDomain: "musicfy-29840.firebaseapp.com",
  projectId: "musicfy-29840",
  storageBucket: "musicfy-29840.appspot.com",
  messagingSenderId: "418231206807",
  appId: "1:418231206807:web:bf674bbc8a592b681a7ad2",
};

export const initFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(initFirebase);
