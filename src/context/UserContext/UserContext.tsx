import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { UserResponse, UserService } from 'clients/CoreService';
import { useApiToken } from 'hooks/auth';
import { entities } from 'consts/entities';
import { useSnackbarOnError } from 'hooks/notistack';

export const UserContext = createContext<{ user?: UserResponse; isLoaded: boolean }>({
	isLoaded: false,
});

export const useRole = () => useContext(UserContext).user?.role;

export const UserContextProvider = ({ children }: PropsWithChildren) => {
	const [apiToken] = useApiToken();
	const [isLoaded, setIsLoaded] = useState(!apiToken);
	const { data: user } = useQuery([entities.contextUser], UserService.getCurrent, {
		enabled: !!apiToken,
		onError: useSnackbarOnError(),
		onSettled: () => setIsLoaded(true),
	});

	return <UserContext.Provider value={{ user, isLoaded }}>{children}</UserContext.Provider>;
};
