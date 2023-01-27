/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarWithTitleImageResponse } from './CarWithTitleImageResponse';
import type { PaymentResponse } from './PaymentResponse';
import type { RentalOrderResponse } from './RentalOrderResponse';

export type OrderListItemResponse = {
    car: CarWithTitleImageResponse;
    order: RentalOrderResponse;
    payment: PaymentResponse;
};

