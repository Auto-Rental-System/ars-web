import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Head from 'next/head';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { AppHeader } from 'components/AppHeader';
import { ListHeader } from 'components/ListHeader';
import { CarCard } from 'components/CarCard';
import { CarOrderBy, CarService, Order } from 'clients/CoreService';
import { useRole } from 'context/UserContext';
import { entities } from 'consts/entities';
import { useSnackbarOnError } from 'hooks/notistack';

import { path as addCarPath } from 'pages/cars/add';

export const path = '/cars';

export const getServerSideProps: GetServerSideProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery([entities.carsToRent, 0, 10, 'ASC', 'car.price'], () =>
		CarService.getAllCars(1, 10),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default function CarsPage() {
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [orderBy, setOrderBy] = useState<string>('car.price');
	const [order, setOrder] = useState<Order>('ASC');
	const role = useRole();
	const { data: cars, isLoading } = useQuery(
		[entities.carsToRent, page, rowsPerPage, order, orderBy],
		() => CarService.getAllCars(page + 1, rowsPerPage, order, orderBy as CarOrderBy),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			onError: useSnackbarOnError(),
		},
	);

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
					<Container>
						<Typography variant={'h4'} mt={5} mb={2}>
							Cars To Rent
						</Typography>
						{isLoading && <LinearProgress />}
						{!cars?.list.length && <>No items to display</>}
						{!!cars?.list.length && (
							<>
								<ListHeader
									orderBy={orderBy}
									setOrderBy={setOrderBy}
									orderByOptions={['car.price', 'car.engine_capacity']}
									getOrderByLabel={option =>
										((
											{
												'car.price': 'Price',
												'car.engine_capacity': 'Engine Capacity',
											} as Record<CarOrderBy, string>
										)[option as CarOrderBy])
									}
									order={order}
									setOrder={setOrder}
									orderDisabled={isLoading}
									onAdd={
										role === 'Landlord'
											? async () => {
													await router.push(addCarPath);
											  }
											: undefined
									}
									addText={'ADD NEW CAR'}
								/>
								<Grid container gap={2}>
									{cars.list.map(car => (
										<Grid item xs={12} key={car.id}>
											<CarCard car={car} onClick={() => router.push(`/cars/${car.id}`)} />
										</Grid>
									))}
								</Grid>
								<TablePagination
									component={'div'}
									count={cars.total}
									page={page}
									rowsPerPageOptions={[2, 5, 10]}
									onPageChange={(_, newPage) => setPage(newPage)}
									rowsPerPage={rowsPerPage}
									onRowsPerPageChange={event => {
										setRowsPerPage(parseInt(event.target.value, 10));
										setPage(0);
									}}
								/>
							</>
						)}
					</Container>
				</Box>
			</main>
		</>
	);
}
