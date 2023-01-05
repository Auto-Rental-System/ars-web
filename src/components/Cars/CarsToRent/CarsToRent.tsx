import { useState } from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';

import Sort from 'assets/icons/sort.svg';
import { entities } from 'consts/entities';
import { CarOrderBy, CarService, Order } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack';
import { CarCard } from 'components/CarCard';
import {
	WLinearProgress,
	ListHolder,
	Header,
	OrderByAutocomplete,
	OrderButton,
} from './CarsToRent.styles';

export default function CarsToRent() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(1);
	const [orderBy, setOrderBy] = useState<CarOrderBy>('car.price');
	const [order, setOrder] = useState<Order>('ASC');
	const { data: cars, isLoading } = useQuery(
		[entities.carsToRent, page, rowsPerPage, order, orderBy],
		() => CarService.getAllCars(page + 1, rowsPerPage, order, orderBy),
		{
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
					<Header>
						<OrderByAutocomplete
							renderInput={params => <TextField {...params} label={'Ordering'} />}
							size={'small'}
							options={['car.price', 'car.engine_capacity'] as Array<CarOrderBy>}
							disableClearable
							value={orderBy}
							getOptionLabel={option =>
								((
									{
										'car.price': 'Price',
										'car.engine_capacity': 'Engine Capacity',
									} as Record<CarOrderBy, string>
								)[option as CarOrderBy])
							}
							onChange={(_, newOrderBy) => setOrderBy(newOrderBy as CarOrderBy)}
						/>
						<OrderButton
							onClick={() => setOrder(order === 'ASC' ? 'DESC' : 'ASC')}
							disabled={isLoading}
						>
							<Image src={Sort} alt={'Sort'} className={'sort-icon'} />
							<Typography variant={'body1'} color={'primary'}>
								{order}
							</Typography>
						</OrderButton>
					</Header>
					<ListHolder>
						{cars.list.map(car => (
							<Grid item>
								<CarCard car={car} />
							</Grid>
						))}
					</ListHolder>
					<TablePagination
						component={'div'}
						count={cars.total}
						page={page}
						rowsPerPageOptions={[1, 3, 5]}
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
