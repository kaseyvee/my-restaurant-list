import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "my-eats-dae72.firebaseapp.com",
  projectId: "my-eats-dae72",
  storageBucket: "my-eats-dae72.appspot.com",
  messagingSenderId: "723115849641",
  appId: "1:723115849641:web:9659b6779883eb706476b8"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);