declare global {
	namespace NodeJs {
		interface ProcessEnv {
			VITE_PUBLIC_FIREBASE_API_KEY: string;
			VITE_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
			VITE_PUBLIC_FIREBASE_PROJECT_ID: string;
			VITE_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
			VITE_PUBLIC_FIREBASE_MESSAGE_SENDER_ID: string;
			VITE_PUBLIC_FIREBASE_APP_ID: string;
		}
	}

	// namespace Bun {
	//     interface ProcessEnv {
	//         API_KEY: string;
	//         AUTH_DOMAIN: string;
	//         PROJECT_ID: string;
	//         STORAGE_BUCKET: string;
	//         MESSAGE_SENDER_ID: string;
	//         APP_ID: string;
	//     }
	// }
}

export {};
