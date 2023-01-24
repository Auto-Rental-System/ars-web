/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OwnCarListItemResponse } from './OwnCarListItemResponse';

export type OwnCarListResponse = {
    list: Array<OwnCarListItemResponse>;
    page: number;
    rowsPerPage: number;
    total: number;
};

