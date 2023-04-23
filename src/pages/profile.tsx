import Head from 'next/head';

import { AppHeader } from 'components/AppHeader';
import { Profile } from 'components/Profile';
import { GetServerSideProps } from 'next';
import { applyRoleRouting, EMPTY_PROPS, setClientConfig } from 'shared';

export const path = '/profile';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	setClientConfig(req);
	const redirecting = await applyRoleRouting(['Landlord', 'Renter']);
	return redirecting || EMPTY_PROPS;
};

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
