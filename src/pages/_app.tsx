import type { AppProps } from 'next/app';
import { useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import MuiStylesProvider from '@mui/styles/StylesProvider';

import theme, { GlobalStyle } from 'themes';
import { SnackbarProvider } from 'hooks/notistack';
import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';
import { useAutoTokenRefresh } from 'hooks/auth';
import { UserContextProvider } from 'context/UserContext';

CoreOpenAPi.BASE = process.env.NEXT_PUBLIC_CORE_URL as string;

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());

	useAutoTokenRefresh();

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<StyledThemeProvider theme={theme}>
					<MuiStylesProvider injectFirst>
						<StyledEngineProvider injectFirst>
							<MuiThemeProvider theme={theme}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<PayPalScriptProvider
										options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}
									>
										<SnackbarProvider>
											<CookiesProvider>
												<UserContextProvider>
													<GlobalStyle />
													<Component {...pageProps} />
												</UserContextProvider>
											</CookiesProvider>
										</SnackbarProvider>
									</PayPalScriptProvider>
								</LocalizationProvider>
							</MuiThemeProvider>
						</StyledEngineProvider>
					</MuiStylesProvider>
				</StyledThemeProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}
