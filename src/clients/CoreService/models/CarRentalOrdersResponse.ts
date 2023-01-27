/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RentalOrderResponse } from './RentalOrderResponse';

export type CarRentalOrdersResponse = {
    carId: number;
    rentalOrders: Array<RentalOrderResponse>;
};

