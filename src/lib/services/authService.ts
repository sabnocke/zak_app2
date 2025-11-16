import { auth, provider } from '$lib/firebase.ts';
import { GoogleAuthProvider, signInWithPopup, type AuthError, signOut } from 'firebase/auth';
import { authState } from '$lib/stores.svelte.ts';
import type { AuthState } from '$lib/types.ts';

export interface ErrorResult {
	message: string;
	code: string;
	email: string;
}

export interface SuccessResult {
	state: AuthState;
	token: string | null;	//? I might need it
}

export interface Result {
	isSuccess: boolean;
	error: ErrorResult;
	success: SuccessResult;
}

export const DEFAULT_AUTH_RESULT: Result = {
	isSuccess: false,
	error: {message: "", code: "", email: ""},
	success: { state: authState, token: null},
}

//? potential Either<> here
export function handleSignIn(): Result {

	const out: Result = DEFAULT_AUTH_RESULT;
	signInWithPopup(auth, provider).then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential?.accessToken || null;

		// The signed-in user info.
		const user = result.user;

		out.isSuccess = true;
		authState.user = user;
		authState.isAuthenticated = true;
		authState.isLoading = false;
		out.success = { state: authState, token};

		console.log(authState);

	}).catch((error: AuthError) => {
		const code = error.code;
		const message = error.message;
		const email = error.customData.email || "";

		console.error(email, message);

		out.isSuccess = false;
		out.error = { message, code, email }
	});

	return out;
}

export function handleSignOut(): boolean {
	let out = false;

	signOut(auth).then(() => {
		out = true;
		authState.isAuthenticated = false;
	}).catch((error: AuthError) => {
		out = false;
		console.error(error);
		//TODO do something with the error
	})

	return out;
}