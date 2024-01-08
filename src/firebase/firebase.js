import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import conf from "../conf/conf";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: conf.apiKey,
    authDomain: conf.authUrl,
    projectId: conf.projectId,
    storageBucket: conf.bucketId,
    messagingSenderId: conf.senderId,
    appId: conf.appId
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app)

