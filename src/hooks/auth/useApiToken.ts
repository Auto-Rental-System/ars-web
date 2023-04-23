import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';

import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';
import { entities } from 'consts/entities';
import { SharedStateReturn, useSharedState } from 'hooks/state/useSharedState';

export const ACCOUNT_RESPONSE_KEY = 'AUTH_INFO';

export type ApiToken = Pick<AuthenticationResultType, 'AccessToken' | 'RefreshToken'> & {
	username: string;
};

export function useApiToken(): SharedStateReturn<null | ApiToken> {
	const [cookies, setCookie] = useCookies([ACCOUNT_RESPONSE_KEY]);

	const getAccessToken = useCallback((): null | ApiToken => {
		const restored = cookies[ACCOUNT_RESPONSE_KEY];
		return restored || null;
	}, [cookies]);

	const setAccessToken = useCallback(
		(token: null | ApiToken) => {
			setCookie(ACCOUNT_RESPONSE_KEY, token, { path: '/' });
		},
		[setCookie],
	);

	const [apiToken, setApiToken] = useSharedState<null | ApiToken>(
		entities.accessToken,
		getAccessToken(),
		setAccessToken,
	);

	if (apiToken) {
		CoreOpenAPi.TOKEN = apiToken.AccessToken;
	} else {
		delete CoreOpenAPi.TOKEN;
	}

	return [apiToken, setApiToken];
}
