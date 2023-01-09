import Head from 'next/head';

import { AppHeader } from 'components/AppHeader';
import { Profile } from 'components/Profile';

export const path = '/profile';

export default function Home() {
	return (
		<>
			<Head>
				<title>NextJS Web Boilerplate</title>
				<meta name='description' content='NextJS Web Boilerplate' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<AppHeader />
				<Profile />
			</main>
		</>
	);
}
