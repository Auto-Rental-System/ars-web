import { CarListItemResponse } from 'clients/CoreService';

export { default as CarCard } from './CarCard';

export type CarCardProps = {
	car: CarListItemResponse;
};
