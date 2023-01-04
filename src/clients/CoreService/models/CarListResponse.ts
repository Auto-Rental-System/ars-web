/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarListItemResponse } from './CarListItemResponse';

export type CarListResponse = {
    list: Array<CarListItemResponse>;
    page: number;
    rowsPerPage: number;
    total: number;
};

