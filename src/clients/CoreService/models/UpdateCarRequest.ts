/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UpdateCarRequest = {
    brand: string;
    model: string;
    description: string;
    fuel: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
    gearbox: 'Manual' | 'Automatic';
    engineCapacity: number;
    fuelConsumption: number;
    pledge: number;
    price: number;
    images: Array<string>;
};

