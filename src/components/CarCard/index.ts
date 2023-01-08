import { CarListItemResponse } from 'clients/CoreService';
import { ButtonBaseProps } from '@mui/material/ButtonBase';

export { default as CarCard } from './CarCard';

export type CarCardProps = {
	car: CarListItemResponse;
} & ButtonBaseProps;
