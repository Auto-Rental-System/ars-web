import Head from 'next/head';

import { SignUp } from 'components/Auth';

export default function () {
	return (
		<>
			<Head>
				<title>Sign Up</title>
				<meta name='description' content='Auto Rental System' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<SignUp />
			</main>
		</>
	);
}
