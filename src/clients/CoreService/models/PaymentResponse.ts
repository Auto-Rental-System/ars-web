/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentStatus } from './PaymentStatus';
import type { PaymentType } from './PaymentType';

export type PaymentResponse = {
    userId: number;
    type: PaymentType;
    status: PaymentStatus;
    grossValue: number;
    netValue: number;
    paypalFee: number;
    serviceFee: number;
};

