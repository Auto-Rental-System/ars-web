import { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { default as SignInPage, path as signInPath } from 'pages/auth/sign-in';
import { default as HomePage, path as homePath } from 'pages/';
import { path as signUpPath } from 'pages/auth/sign-up';
import { path as verifyAccountPath } from 'pages/auth/verify';
import { path as carsListPath } from 'pages/cars';
import { path as addCarPath } from 'pages/cars/add';
import { path as singleCarPath } from 'pages/cars/[id]';
import { path as profilePath } from 'pages/profile';
import { path as rentalOrdersPath } from 'pages/reports/rental-orders';
import { path as myCarsPath } from 'pages/reports/my-cars';
import { UserContext, useRole } from 'context/UserContext';
import { UserRole } from 'clients/CoreService';
import { RoutingProps } from '.';

type RoutingRole = UserRole | 'NO_ROLE';

export default function Routing({ Component, pageProps }: RoutingProps) {
	const routes: Array<{ path: string; roles: Array<RoutingRole> }> = useMemo(
		() => [
			{
				path: signInPath,
				roles: ['NO_ROLE'],
			},
			{
				path: signUpPath,
				roles: ['NO_ROLE'],
			},
			{
				path: verifyAccountPath,
				roles: ['NO_ROLE'],
			},
			{
				path: homePath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: carsListPath,
				roles: ['Renter', 'Landlord', 'NO_ROLE'],
			},
			{
				path: addCarPath,
				roles: ['Landlord'],
			},
			{
				path: singleCarPath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: profilePath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: rentalOrdersPath,
				roles: ['Renter', 'Landlord'],
			},
			{
				path: myCarsPath,
				roles: ['Landlord'],
			},
		],
		[],
	);
	const defaultPages: Record<RoutingRole, { Component: () => JSX.Element; path: string }> = useMemo(
		() => ({
			Renter: { Component: HomePage, path: homePath },
			Landlord: { Component: HomePage, path: homePath },
			NO_ROLE: { Component: SignInPage, path: signInPath },
		}),
		[],
	);

	const userContext = useContext(UserContext);
	const role: RoutingRole = useRole() || 'NO_ROLE';
	const router = useRouter();

	// we need it because useRouter doesn't work without useEffect
	const [replaceComponent, setReplaceComponent] = useState<boolean>(false);

	useEffect(() => {
		const route = routes.find(route => route.path === router.route);
		if (route && !route.roles.includes(role) && userContext.isLoaded) {
			const page = defaultPages[role];
			router.replace(page.path).then(() => setReplaceComponent(true));
		}
	}, [router, role, setReplaceComponent, defaultPages, routes, userContext.isLoaded]);

	if (replaceComponent) {
		const DefaultComponent = defaultPages[role].Component;
		setReplaceComponent(false);
		return <DefaultComponent {...pageProps} />;
	} else {
		return <Component {...pageProps} />;
	}
}
