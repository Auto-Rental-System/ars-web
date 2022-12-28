import Head from 'next/head';
import Box from '@mui/material/Box';

import { SignIn } from 'components/Auth';
import { AppHeader } from 'components/AppHeader';

export default function SignInPage() {
	return (
		<>
			<Head>
				<title>Sign In</title>
				<meta name='description' content='Auto Rental System' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Box height={'100%'} display={'flex'} flexDirection={'column'}>
					<AppHeader />
					<SignIn />
				</Box>
			</main>
		</>
	);
}
