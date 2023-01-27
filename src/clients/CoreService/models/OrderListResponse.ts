/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderListItemResponse } from './OrderListItemResponse';

export type OrderListResponse = {
    list: Array<OrderListItemResponse>;
    page: number;
    rowsPerPage: number;
    total: number;
};

