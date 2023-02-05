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
import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';
import { useAutoTokenRefresh } from 'hooks/auth';
import { UserContextProvider } from 'context/UserContext';
import { Routing } from 'components/Routing';

const queryClient = new QueryClient();

CoreOpenAPi.BASE = process.env.NEXT_PUBLIC_CORE_URL as string;

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
