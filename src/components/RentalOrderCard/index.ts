import { ButtonBaseProps } from '@mui/material/ButtonBase';
import {
	CarWithTitleImageResponse,
	RentalOrderResponse,
	PaymentResponse,
} from 'clients/CoreService';

export { default as RentalOrderCard } from './RentalOrderCard';

export type RentalOrderCardProps = {
	car: CarWithTitleImageResponse;
	payment: PaymentResponse;
	rentalOrder: RentalOrderResponse;
} & ButtonBaseProps;
