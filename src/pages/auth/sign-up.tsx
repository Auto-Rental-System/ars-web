import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Box from '@mui/material/Box';

import { SignUp } from 'components/Auth';
import { AppHeader } from 'components/AppHeader';
import { applyRoleRouting, EMPTY_PROPS, setClientConfig } from 'shared';

export const path = '/auth/sign-up';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	setClientConfig(req);
	const redirecting = await applyRoleRouting(['NO_ROLE']);
	return redirecting || EMPTY_PROPS;
};

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
