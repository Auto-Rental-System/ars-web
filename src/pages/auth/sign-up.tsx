import Head from 'next/head';
import Box from '@mui/material/Box';

import { SignUp } from 'components/Auth';
import { AppHeader } from 'components/AppHeader';

export const path = '/auth/sign-up';

export default function SignUpPage() {
	return (
		<>
			<Head>
				<title>Sign Up | ARS</title>
				<meta name='description' content='Auto Rental System' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Box height={'100%'} display={'flex'} flexDirection={'column'}>
					<AppHeader hideUser hideNavigation />
					<SignUp />
				</Box>
			</main>
		</>
	);
}
