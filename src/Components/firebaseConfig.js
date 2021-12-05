import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJ4thrZQXFMvbMRnazOEyO_5vHxhOUWSE",
  authDomain: "fir-chat-72291.firebaseapp.com",
  databaseURL: "https://fir-chat-72291-default-rtdb.firebaseio.com",
  projectId: "fir-chat-72291",
  storageBucket: "fir-chat-72291.appspot.com",
  messagingSenderId: "162830584031",
  appId: "1:162830584031:web:27cbe50a8f9c839776416a"
};

    
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const database = getDatabase(app);

  export default database;
