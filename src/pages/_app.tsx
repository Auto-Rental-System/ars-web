import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import MuiStylesProvider from '@mui/styles/StylesProvider';

import theme, { GlobalStyle } from 'themes';
import { SnackbarProvider } from 'hooks/notistack';
import { OpenAPI as CoreOpenAPi, UserRole } from 'clients/CoreService';
import { useAutoTokenRefresh } from 'hooks/auth';
import { UserContextProvider, useRole } from 'context/UserContext';

import { path as signInPath, default as SignInPage } from 'pages/auth/sign-in';
import { path as signUpPath } from 'pages/auth/sign-up';
import { path as homePath, default as HomePage } from 'pages/index';

const queryClient = new QueryClient();

CoreOpenAPi.BASE = process.env.NEXT_PUBLIC_CORE_URL as string;

type RoutingRole = UserRole | 'NO_ROLE';

function Routing({ Component, pageProps }: Pick<AppProps, 'Component' | 'pageProps'>) {
	const routes: Array<{ path: string; roles: Array<RoutingRole> }> = useMemo(() => ([
		{
			path: signInPath,
			roles: ['NO_ROLE'],
		},
		{
			path: signUpPath,
			roles: ['NO_ROLE'],
		},
		{
			path: homePath,
			roles: ['Renter', 'Landlord'],
		},
	]), []);
	const defaultPages: Record<RoutingRole, { Component: () => JSX.Element; path: string }> = useMemo(() => ({
		Renter: { Component: HomePage, path: homePath },
		Landlord: { Component: HomePage, path: homePath },
		NO_ROLE: { Component: SignInPage, path: signInPath },
	}), []);

	const role: RoutingRole = useRole() || 'NO_ROLE';
	const router = useRouter();

	// we need it because useRouter doesn't work without useEffect
	const [replaceComponent, setReplaceComponent] = useState<boolean>(false);

	useEffect(() => {
		const route = routes.find(route => route.path === router.route);
		if (route && !route.roles.includes(role)) {
			const page = defaultPages[role];
			router.replace(page.path).then(() => setReplaceComponent(true));
		}
	}, [router, role, setReplaceComponent, defaultPages, routes]);

	if (replaceComponent) {
		const DefaultComponent = defaultPages[role].Component;
		setReplaceComponent(false);
		return <DefaultComponent {...pageProps} />;
	} else {
		return <Component {...pageProps} />;
	}
}

export default function App({ Component, pageProps }: AppProps) {
	useAutoTokenRefresh();

	return (
		<QueryClientProvider client={queryClient} contextSharing>
			<StyledThemeProvider theme={theme}>
				<MuiStylesProvider injectFirst>
					<StyledEngineProvider injectFirst>
						<MuiThemeProvider theme={theme}>
							<SnackbarProvider>
								<UserContextProvider>
									<GlobalStyle />
									<Routing Component={Component} pageProps={pageProps} />
								</UserContextProvider>
							</SnackbarProvider>
						</MuiThemeProvider>
					</StyledEngineProvider>
				</MuiStylesProvider>
			</StyledThemeProvider>
		</QueryClientProvider>
	);
}
