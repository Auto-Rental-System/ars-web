import { CarWithImagesResponse } from 'clients/CoreService';

export { default as SingleCar } from './SingleCar';

export type SingleCarProps = {
	car: CarWithImagesResponse;
};
