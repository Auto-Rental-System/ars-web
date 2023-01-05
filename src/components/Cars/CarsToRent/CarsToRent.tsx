import { useState } from 'react';
import { useQuery } from 'react-query';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TablePagination from '@mui/material/TablePagination';

import { entities } from 'consts/entities';
import { CarService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack';
import { CarCard } from 'components/CarCard';
import { WLinearProgress, ListHolder } from './CarsToRent.styles';

export default function CarsToRent() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(1);
	const { data: cars, isLoading } = useQuery(
		[entities.carsToRent, page, rowsPerPage],
		() => CarService.getAllCars(page + 1, rowsPerPage),
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
