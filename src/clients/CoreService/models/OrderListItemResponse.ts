/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarResponse } from './CarResponse';
import type { PaymentResponse } from './PaymentResponse';
import type { RentalOrderResponse } from './RentalOrderResponse';

export type OrderListItemResponse = {
    car: CarResponse;
    order: RentalOrderResponse;
    payment: PaymentResponse;
};

