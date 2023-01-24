/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CarWithTitleImageResponse } from './CarWithTitleImageResponse';

export type CarListResponse = {
    list: Array<CarWithTitleImageResponse>;
    page: number;
    rowsPerPage: number;
    total: number;
};

