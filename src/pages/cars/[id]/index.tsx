import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import Head from 'next/head';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { AppHeader } from 'components/AppHeader';
import { SingleCar } from 'components/Cars/SingleCar';
import { entities } from 'consts/entities';
import { CarService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack';

export const path = '/cars/[id]';

export default function CarPage() {
	const router = useRouter();
	const id = parseInt(router.query.id as string);

	const { data: car, isLoading } = useQuery(
		[entities.singleCar, id],
		() => CarService.getById(id),
		{
			refetchOnWindowFocus: false,
			onError: useSnackbarOnError(),
			enabled: !!id,
		},
	);

	return (
		<>
			<Head>
				<title>Rent car | ARS</title>
				<meta name='description' content='Auto Rental System' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Box height={'100%'} display={'flex'} flexDirection={'column'}>
					<AppHeader />
					{isLoading && <LinearProgress />}
					{car && <SingleCar car={car} />}
				</Box>
			</main>
		</>
	);
}
