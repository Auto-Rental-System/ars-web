import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import TablePagination from '@mui/material/TablePagination';

import { MyCarListOrderBy, Order, ReportService } from 'clients/CoreService';
import { entities } from 'consts/entities';
import { useSnackbarOnError } from 'hooks/notistack';
import { AppHeader } from 'components/AppHeader';
import { ListHeader } from 'components/ListHeader';
import { ListHolder } from 'components/Cars/CarsToRent/CarsToRent.styles';
import { CarCard } from 'components/CarCard';

export const path = '/reports/my-cars';

export default function MyCarsPage() {
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [orderBy, setOrderBy] = useState<string>('car.id');
	const [order, setOrder] = useState<Order>('ASC');
	const { data: orders, isLoading } = useQuery(
		[entities.myCarsReport, page, rowsPerPage, order, orderBy],
		() => ReportService.getMyCarsReport(page + 1, rowsPerPage, order, orderBy as MyCarListOrderBy),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			onError: useSnackbarOnError(),
		},
	);

	return (
		<>
			<Head>
				<title>My Cars | ARS</title>
				<meta name='description' content='NextJS Web Boilerplate' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<AppHeader />
				<Container>
					<Typography variant={'h4'} mt={5} mb={2}>
						My Cars Report
					</Typography>
					{!orders?.list.length ? (
						<Alert severity={'info'}>You have no cars</Alert>
					) : (
						<>
							<ListHeader
								orderBy={orderBy}
								setOrderBy={setOrderBy}
								orderByOptions={['car.id']}
								getOrderByLabel={option =>
									((
										{
											'car.id': 'Car ID',
										} as Record<MyCarListOrderBy, string>
									)[option as MyCarListOrderBy])
								}
								order={order}
								setOrder={setOrder}
								orderDisabled={isLoading}
							/>
							<ListHolder>
								{orders.list.map(car => (
									<Grid item key={car.id}>
										<CarCard car={car} showReport />
									</Grid>
								))}
							</ListHolder>
							<TablePagination
								component={'div'}
								count={orders.total}
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
			</main>
		</>
	);
}
