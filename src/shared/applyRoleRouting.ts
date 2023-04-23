import { UserRole, UserService } from 'clients/CoreService';
import { path as homePath } from 'pages';
import { path as signInPath } from 'pages/auth/sign-in';

type RoutingRole = UserRole | 'NO_ROLE';

export const EMPTY_PROPS = { props: {} };

export async function applyRoleRouting(allowedRoles: Array<RoutingRole>) {
	const defaultPaths: Record<RoutingRole, string> = {
		Renter: homePath,
		Landlord: homePath,
		NO_ROLE: signInPath,
	};

	let role: RoutingRole = 'NO_ROLE';

	try {
		const user = await UserService.getCurrent();
		role = user.role;
	} catch (e) {
		// console.log(e);
	}

	if (!allowedRoles.includes(role)) {
		return {
			redirect: {
				destination: defaultPaths[role],
				permanent: false,
			},
		};
	}
}
