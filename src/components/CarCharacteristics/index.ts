import { CarResponse } from 'clients/CoreService';

export { default as CarCharacteristics } from './CarCharacteristics';

export type CarCharacteristicsProps = Pick<
	CarResponse,
	'fuel' | 'fuelConsumption' | 'engineCapacity' | 'gearbox'
>;
