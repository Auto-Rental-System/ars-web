import Grid from '@mui/material/Grid';
import { CarCard } from 'components/CarCard';

import { CarsListProps } from '.';
import {ListHolder} from "./CarsList.styles";

export default function CarsList({ cars }: CarsListProps) {
	return (
		<ListHolder>
				{cars.map(car => (
					<Grid item>
						<CarCard car={car} />
					</Grid>
				))}
		</ListHolder>
	);
}
