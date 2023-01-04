/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserRole } from './UserRole';

export type UserResponse = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
};

