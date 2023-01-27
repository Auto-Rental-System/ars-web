/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CarImagesSignedPostUrlResponse } from '../models/CarImagesSignedPostUrlResponse';
import type { CarListResponse } from '../models/CarListResponse';
import type { CarRentalOrdersResponse } from '../models/CarRentalOrdersResponse';
import type { CarResponse } from '../models/CarResponse';
import type { CarWithImagesResponse } from '../models/CarWithImagesResponse';
import type { CreateCarRequest } from '../models/CreateCarRequest';
import type { RentCarRequest } from '../models/RentCarRequest';
import type { UpdateCarRequest } from '../models/UpdateCarRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CarService {

    /**
     * @param requestBody
     * @returns CarResponse
     * @throws ApiError
     */
    public static create(
        requestBody: CreateCarRequest,
    ): CancelablePromise<CarResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cars',
            body: requestBody,
            mediaType: 'application/json',
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
     * @returns CarListResponse
     * @throws ApiError
     */
    public static getAllCars(
        page: number,
        rowsPerPage: number,
        order?: 'ASC' | 'DESC',
        orderBy?: 'car.price' | 'car.engine_capacity',
        filters?: Array<string>,
    ): CancelablePromise<CarListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cars',
            query: {
                'page': page,
                'rowsPerPage': rowsPerPage,
                'order': order,
                'orderBy': orderBy,
                'filters': filters,
            },
        });
    }

    /**
     * @param id
     * @param filenames
     * @returns CarImagesSignedPostUrlResponse
     * @throws ApiError
     */
    public static getImagesSignedPostUrls(
        id: number,
        filenames: Array<string>,
    ): CancelablePromise<CarImagesSignedPostUrlResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cars/{id}/images/signed-urls/post',
            path: {
                'id': id,
            },
            query: {
                'filenames': filenames,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param id
     * @returns CarWithImagesResponse
     * @throws ApiError
     */
    public static getById(
        id: number,
    ): CancelablePromise<CarWithImagesResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cars/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns CarWithImagesResponse
     * @throws ApiError
     */
    public static update(
        id: number,
        requestBody: UpdateCarRequest,
    ): CancelablePromise<CarWithImagesResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/cars/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns CarWithImagesResponse
     * @throws ApiError
     */
    public static rent(
        id: number,
        requestBody: RentCarRequest,
    ): CancelablePromise<CarWithImagesResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/cars/{id}/order',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }

    /**
     * @param id
     * @param from
     * @param to
     * @returns CarRentalOrdersResponse
     * @throws ApiError
     */
    public static getRentalOrders(
        id: number,
        from: string,
        to: string,
    ): CancelablePromise<CarRentalOrdersResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/cars/{id}/rental-orders',
            path: {
                'id': id,
            },
            query: {
                'from': from,
                'to': to,
            },
            errors: {
                401: `Unauthorized`,
            },
        });
    }

}
