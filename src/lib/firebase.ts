import { initializeApp, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
    path: path.resolve(path.dirname("."), ".env")
});

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

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


auth.useDeviceLanguage()