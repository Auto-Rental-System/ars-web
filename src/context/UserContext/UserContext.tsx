import { createContext, PropsWithChildren, useContext } from 'react';
import { useQuery } from 'react-query';

import { UserResponse, UserService } from 'clients/CoreService';
import { useApiToken } from 'hooks/auth';
import { entities } from 'consts/entities';
import { useSnackbarOnError } from 'hooks/notistack';

export const UserContext = createContext<UserResponse | null>(null);

export const useRole = () => useContext(UserContext)?.role;

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [apiToken] = useApiToken();
	const { data: user } = useQuery([entities.contextUser], UserService.getCurrent, {
		enabled: !!apiToken,
		onError: useSnackbarOnError(),
	});

	return <UserContext.Provider value={user || null}>{children}</UserContext.Provider>;
};
