/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Fuel } from './Fuel';
import type { Gearbox } from './Gearbox';

export type OwnCarListItemResponse = {
    id: number;
    brand: string;
    model: string;
    description: string;
    fuel: Fuel;
    gearbox: Gearbox;
    engineCapacity: number;
    fuelConsumption: number;
    pledge: number;
    price: number;
    netValue: number;
};

