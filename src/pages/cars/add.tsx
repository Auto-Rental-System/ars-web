import Head from 'next/head';
import Box from '@mui/material/Box';

import { AppHeader } from 'components/AppHeader';
import { AddCar } from 'components/cars/AddCar';

export const path = '/cars/add';

export default function CarsPage() {
	return (
		<>
			<Head>
				<title>Cars | ARS</title>
				<meta name='description' content='Auto Rental System' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Box height={'100%'} display={'flex'} flexDirection={'column'}>
					<AppHeader />
					<AddCar />
				</Box>
			</main>
		</>
	);
}