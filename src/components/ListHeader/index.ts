import React from 'react';

import { Order } from 'clients/CoreService';

export type ListHeaderProps = {
	orderBy: string;
	setOrderBy: React.Dispatch<React.SetStateAction<string>>;
	orderByOptions: Array<string>;
	getOrderByLabel?: (a: string) => string;
	order: Order;
	setOrder: React.Dispatch<React.SetStateAction<Order>>;
	orderDisabled?: boolean;
	onAdd?: () => any;
	addText?: string;
};

export { default as ListHeader } from './ListHeader';
