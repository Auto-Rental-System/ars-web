import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

import { AppHeader } from 'components/AppHeader';
import { Order, OrderListOrderBy, ReportService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack';
import { entities } from 'consts/entities';
import { ListHeader } from 'components/ListHeader';
import { RentalOrderCard } from 'components/RentalOrderCard';
import { applyRoleRouting, setClientConfig } from 'shared';

export const path = '/reports/rental-orders';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	setClientConfig(req);
	const redirecting = await applyRoleRouting(['Renter', 'Landlord']);

	if (redirecting) {
		return redirecting;
	}

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery([entities.orders, 0, 10, 'ASC', 'order.id'], () =>
		ReportService.getMyOrders(1, 10),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default function RentalOrdersPage() {
	const router = useRouter();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [orderBy, setOrderBy] = useState<string>('order.id');
	const [order, setOrder] = useState<Order>('ASC');
	const { data: orders, isLoading } = useQuery(
		[entities.orders, page, rowsPerPage, order, orderBy],
		() => ReportService.getMyOrders(page + 1, rowsPerPage, order, orderBy as OrderListOrderBy),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			onError: useSnackbarOnError(),
		},
	);

	return (
		<>
			<Head>
				<title>My Rental Orders | ARS</title>
				<meta name='description' content='NextJS Web Boilerplate' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<AppHeader />
				<Container>
					<Typography variant={'h4'} mt={5} mb={2}>
						My Rental Orders Report
					</Typography>
					{!orders?.list.length ? (
						<Alert severity={'info'}>There are no rental orders</Alert>
					) : (
						<>
							<ListHeader
								orderBy={orderBy}
								setOrderBy={setOrderBy}
								orderByOptions={['order.id']}
								getOrderByLabel={option =>
									((
										{
											'order.id': 'Order ID',
										} as Record<OrderListOrderBy, string>
									)[option as OrderListOrderBy])
								}
								order={order}
								setOrder={setOrder}
								orderDisabled={isLoading}
							/>
							<Grid container direction={'column'} spacing={1}>
								{orders.list.map(({ car, payment, order }) => (
									<Grid item key={car.id}>
										<RentalOrderCard
											car={car}
											payment={payment}
											rentalOrder={order}
											onClick={() => router.push(`/cars/${car.id}`)}
										/>
									</Grid>
								))}
							</Grid>
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
