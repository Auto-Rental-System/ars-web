import Cookies from 'universal-cookie';

import { ACCOUNT_RESPONSE_KEY } from 'hooks/auth';
import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';

export const setClientConfig = (req: any) => {
	const cookies = new Cookies(req.headers.cookie);
	CoreOpenAPi.TOKEN = cookies.get(ACCOUNT_RESPONSE_KEY).AccessToken;
};
