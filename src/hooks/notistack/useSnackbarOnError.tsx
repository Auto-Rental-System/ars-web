import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

// since this type was constructed from an arbitrary error, there is no
// guarantee every request's error will have similar response structure, therefore it's
// good idea to wrap error message extraction into try catch in order to be safe if a type differs at runtime
export type ApiError = {
	body: {
		id: string;
		message: string;
		statusCode: number;
		data: any;
	};
};

export function extractErrorMessage(error: ApiError | Error) {
	let message = '';
	try {
		message = ((error as ApiError)?.body?.message || (error as Error).message) as string;
	} catch {
		/* received error has an unsupported type, and we'll use default message */
	}
	// default message
	return message && message !== 'Failed to fetch'
		? message
		: 'Connection Error! Check your internet connection and try again!';
}

export function useSnackbarOnError(ignoredErrorCode?: number) {
	const snackbar = useSnackbar();

	return useCallback(
		(error: any) => {
			if (process.env.NODE_ENV === 'development') {
				console.error(error);
			}
			if (!ignoredErrorCode || !error?.status || ignoredErrorCode !== error?.status) {
				snackbar.enqueueSnackbar(extractErrorMessage(error), { variant: 'error' });
			}
		},
		[snackbar, ignoredErrorCode],
	);
}

export function useSnackbarOnSuccess(message: string) {
	const snackbar = useSnackbar();
	return useCallback(() => {
		snackbar.enqueueSnackbar(message, { variant: 'success' });
	}, [snackbar, message]);
}
