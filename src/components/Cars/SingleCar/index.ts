import { DetailedCarResponse } from 'clients/CoreService';

export { default as SingleCar } from './SingleCar';

export type SingleCarProps = {
	car: DetailedCarResponse;
};
