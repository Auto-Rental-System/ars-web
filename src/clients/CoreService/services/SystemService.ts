/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DevInfoResponse } from '../models/DevInfoResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SystemService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static healthy(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/system/healthy',
        });
    }

    /**
     * @returns DevInfoResponse
     * @throws ApiError
     */
    public static getDevInfo(): CancelablePromise<DevInfoResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/system/dev/info',
        });
    }

}
