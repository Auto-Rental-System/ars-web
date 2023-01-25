/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarOrderBy } from './CarOrderBy';
import type { MyCarListOrderBy } from './MyCarListOrderBy';
import type { Order } from './Order';
import type { OrderListOrderBy } from './OrderListOrderBy';

export type DevInfoResponse = {
    carOrderBy: CarOrderBy;
    orderListOrderBy: OrderListOrderBy;
    myCarListOrderBy: MyCarListOrderBy;
    order: Order;
};

