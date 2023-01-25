/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MyCarListItemResponse } from './MyCarListItemResponse';

export type MyCarListResponse = {
    list: Array<MyCarListItemResponse>;
    page: number;
    rowsPerPage: number;
    total: number;
};

