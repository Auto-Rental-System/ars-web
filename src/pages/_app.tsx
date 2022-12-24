import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import MuiStylesProvider from '@mui/styles/StylesProvider';

import theme, { GlobalStyle } from 'themes';
import { SnackbarProvider } from 'hooks/notistack/snackbar.provider';
import { OpenAPI as CoreOpenAPi } from 'clients/CoreService';
import {useAutoTokenRefresh} from "../hooks/auth/useAuthTokenRefresh";

const queryClient = new QueryClient();

CoreOpenAPi.BASE = process.env.CORE_URL as string;

export default function App({ Component, pageProps }: AppProps) {
	// useAutoTokenRefresh();

	return (
		<QueryClientProvider client={queryClient} contextSharing>
			<MuiStylesProvider injectFirst>
				<StyledThemeProvider theme={theme}>
					<StyledEngineProvider injectFirst>
						<MuiThemeProvider theme={theme}>
							<SnackbarProvider>
								<GlobalStyle />
								<Component {...pageProps} />
							</SnackbarProvider>
						</MuiThemeProvider>
					</StyledEngineProvider>
				</StyledThemeProvider>
			</MuiStylesProvider>
		</QueryClientProvider>
	);
}
