import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDy5RYOo8EDCdpHORIelW1uiO_GuSA8hUA",
    authDomain: "tallerdb-85801.firebaseapp.com",
    projectId: "tallerdb-85801",
    storageBucket: "tallerdb-85801.appspot.com",
    messagingSenderId: "61593095605",
    appId: "1:61593095605:web:c77a412c941a6476f5ddfc"
  };

  const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
