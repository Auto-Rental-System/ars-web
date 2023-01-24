/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarOrderBy } from './CarOrderBy';
import type { Order } from './Order';
import type { OrderListOrderBy } from './OrderListOrderBy';
import type { OwnCarListOrderBy } from './OwnCarListOrderBy';

export type DevInfoResponse = {
    carOrderBy: CarOrderBy;
    orderListOrderBy: OrderListOrderBy;
    OwnCarListOrderBy: OwnCarListOrderBy;
    order: Order;
};

