import { CarListResponse } from 'clients/CoreService';

export { default as CarsList } from './CarsList';

export type CarsListProps = {
	cars: CarListResponse['list'];
};
