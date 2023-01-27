import { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import MuiStylesProvider from '@mui/styles/StylesProvider';

import theme, { GlobalStyle } from 'themes';
import { SnackbarProvider } from 'hooks/notistack';
import { OpenAPI as CoreOpenAPi, UserRole } from 'clients/CoreService';
import { useAutoTokenRefresh } from 'hooks/auth';
import { UserContext, UserContextProvider, useRole } from 'context/UserContext';

import { path as signInPath, default as SignInPage } from 'pages/auth/sign-in';
import { path as signUpPath } from 'pages/auth/sign-up';
import { path as verifyAccountPath } from 'pages/auth/verify';
import { path as homePath, default as HomePage } from 'pages/index';
import { path as carsListPath } from 'pages/cars/index';
import { path as addCarPath } from 'pages/cars/add';
import { path as singleCarPath } from 'pages/cars/[id]';
import { path as profilePath } from 'pages/profile';
import { path as rentalOrdersPath } from 'pages/reports/rental-orders';
import { path as myCarsPath } from 'pages/reports/my-cars';

const queryClient = new QueryClient();

CoreOpenAPi.BASE = process.env.NEXT_PUBLIC_CORE_URL as string;

type RoutingRole = UserRole | 'NO_ROLE';

function Routing({ Component, pageProps }: Pick<AppProps, 'Component' | 'pageProps'>) {
	const routes: Array<{ path: string; roles: Array<RoutingRole> }> = useMemo(
		() => [
			{
				path: signInPath,
				roles: ['NO_ROLE'],
			},
			{
				path: signUpPath,
				roles: ['NO_ROLE'],
			},
			{
				path: verifyAccountPath,
				roles: ['NO_ROLE'],
			},
			{
				path: homePath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: carsListPath,
				roles: ['Renter', 'Landlord', 'NO_ROLE'],
			},
			{
				path: addCarPath,
				roles: ['Landlord'],
			},
			{
				path: singleCarPath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: profilePath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: rentalOrdersPath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: myCarsPath,
				roles: ['Landlord'],
			},
		],
		[],
	);
	const defaultPages: Record<RoutingRole, { Component: () => JSX.Element; path: string }> = useMemo(
		() => ({
			Renter: { Component: HomePage, path: homePath },
			Landlord: { Component: HomePage, path: homePath },
			NO_ROLE: { Component: SignInPage, path: signInPath },
		}),
		[],
	);

	const userContext = useContext(UserContext);
	const role: RoutingRole = useRole() || 'NO_ROLE';
	const router = useRouter();

	// we need it because useRouter doesn't work without useEffect
	const [replaceComponent, setReplaceComponent] = useState<boolean>(false);

	useEffect(() => {
		const route = routes.find(route => route.path === router.route);
		if (route && !route.roles.includes(role) && userContext.isLoaded) {
			const page = defaultPages[role];
			router.replace(page.path).then(() => setReplaceComponent(true));
		}
	}, [router, role, setReplaceComponent, defaultPages, routes, userContext.isLoaded]);

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
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<PayPalScriptProvider
									options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}
								>
									<SnackbarProvider>
										<UserContextProvider>
											<GlobalStyle />
											<Routing Component={Component} pageProps={pageProps} />
										</UserContextProvider>
									</SnackbarProvider>
								</PayPalScriptProvider>
							</LocalizationProvider>
						</MuiThemeProvider>
					</StyledEngineProvider>
				</MuiStylesProvider>
			</StyledThemeProvider>
		</QueryClientProvider>
	);
}
