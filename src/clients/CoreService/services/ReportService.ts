/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MyCarListResponse } from '../models/MyCarListResponse';
import type { OrderListResponse } from '../models/OrderListResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReportService {

    /**
     * @param page
     * @param rowsPerPage
     * @param order
     * @param orderBy
     * @param filters
     * @returns MyCarListResponse
     * @throws ApiError
     */
    public static getMyCarsReport(
        page: number,
        rowsPerPage: number,
        order?: 'ASC' | 'DESC',
        orderBy?: 'car.id',
        filters?: Array<string>,
    ): CancelablePromise<MyCarListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reports/cars/own',
            query: {
                'page': page,
                'rowsPerPage': rowsPerPage,
                'order': order,
                'orderBy': orderBy,
                'filters': filters,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param page
     * @param rowsPerPage
     * @param order
     * @param orderBy
     * @param filters
     * @returns OrderListResponse
     * @throws ApiError
     */
    public static getMyOrders(
        page: number,
        rowsPerPage: number,
        order?: 'ASC' | 'DESC',
        orderBy?: 'order.id',
        filters?: Array<string>,
    ): CancelablePromise<OrderListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reports/orders',
            query: {
                'page': page,
                'rowsPerPage': rowsPerPage,
                'order': order,
                'orderBy': orderBy,
                'filters': filters,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}
