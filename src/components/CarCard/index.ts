import { ButtonBaseProps } from '@mui/material/ButtonBase';
import { CarWithTitleImageResponse } from 'clients/CoreService';

export { default as CarCard } from './CarCard';

export type CarCardProps = {
	car: CarWithTitleImageResponse & {
		netValue?: number;
		totalDaysRented?: number;
	};
	showReport?: boolean;
} & ButtonBaseProps;
