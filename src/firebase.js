import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyCkCZYzrg-f-di24ECFd8dvEOXC5YjxURw",
authDomain: "worktrackpro-f9eb8.firebaseapp.com",
projectId: "worktrackpro-f9eb8",
storageBucket: "worktrackpro-f9eb8.firebasestorage.app",
messagingSenderId: "523796095324",
appId: "1:523796095324:web:032552c49add071953e199"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);