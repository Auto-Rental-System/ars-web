import Head from 'next/head';

import { SignIn } from 'components/Auth';

export default function () {
	return (
		<>
			<Head>
				<title>Sign In</title>
				<meta name='description' content='Auto Rental System' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<SignIn />
			</main>
		</>
	);
}
