import Head from 'next/head';

import { AppHeader } from 'components/AppHeader';

export const path = '/reports/rental-orders';

export default function RentalOrdersPage() {
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
			</main>
		</>
	);
}
