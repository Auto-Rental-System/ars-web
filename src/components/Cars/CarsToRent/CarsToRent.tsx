import { useQuery } from 'react-query';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CarsList } from 'components/CarsList';
import { entities } from 'consts/entities';
import { CarService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack';
import { WLinearProgress } from './CarsToRent.styles';

export default function CarsToRent() {
	const { data: cars, isLoading } = useQuery(
		[entities.carsToRent],
		() => CarService.getAllCars(1, 10),
		{
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
			{!!cars?.list.length && <CarsList cars={cars.list} />}
		</Container>
	);
}
