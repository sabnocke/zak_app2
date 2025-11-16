import { initializeApp, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import * as dotenv from 'dotenv';
// // import * as path from "path";
// import path from 'path';

import {
	PUBLIC_FIREBASE_API_KEY,
	PUBLIC_FIREBASE_APP_ID,
	PUBLIC_FIREBASE_AUTH_DOMAIN,
	PUBLIC_FIREBASE_PROJECT_ID,
	PUBLIC_FIREBASE_STORAGE_BUCKET,
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID
} from "$env/static/public";

// dotenv.config({
// 	path: path.resolve(path.dirname('.'), '.env')
// });

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

// const firebaseConfig = {
// 	apiKey: "AIzaSyCPKKopJgPef-T3eQQ4SkrBYXh-_Z9--3s",
// 	authDomain: "aaaa-d8305.firebaseapp.com",
// 	projectId: "aaaa-d8305",
// 	storageBucket: "aaaa-d8305.firebasestorage.app",
// 	messagingSenderId: "758496307110",
// 	appId: "1:758496307110:web:7a4b0ee82ef2bd4509d167"
// };

console.log(firebaseConfig);

function fetchApp(): FirebaseApp {
	try {
		return getApp();
	} catch {
		return initializeApp(firebaseConfig);
	}
}

export const firebaseApp = fetchApp();
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();

// console.log(firebaseApp);

auth.useDeviceLanguage();
