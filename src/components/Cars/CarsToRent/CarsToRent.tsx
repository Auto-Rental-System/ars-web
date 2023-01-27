import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';

import { entities } from 'consts/entities';
import { CarOrderBy, CarService, Order } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack';
import { CarCard } from 'components/CarCard';
import { ListHeader } from 'components/ListHeader';
import { useRole } from 'context/UserContext';
import { path as addCarPath } from 'pages/cars/add';
import { WLinearProgress, ListHolder } from './CarsToRent.styles';

export default function CarsToRent() {
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
		<Container>
			<Typography variant={'h4'} mt={5} mb={2}>
				Cars To Rent
			</Typography>
			{isLoading && <WLinearProgress />}
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
					<ListHolder>
						{cars.list.map(car => (
							<Grid item key={car.id}>
								<CarCard car={car} onClick={() => router.push(`/cars/${car.id}`)} />
							</Grid>
						))}
					</ListHolder>
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
	);
}
