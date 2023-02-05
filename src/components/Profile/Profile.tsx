import { ChangeEvent, useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { UserContext } from 'context/UserContext';
import { useApiToken } from 'hooks/auth';
import { useSnackbarOnError, useSnackbarOnSuccess } from 'hooks/notistack';
import { UserService } from 'clients/CoreService';
import { entities } from 'consts/entities';
import { WAvatar } from './Profile.styles';

export default function Profile() {
	const region: string = process.env.NEXT_PUBLIC_COGNITO_REGION || '';
	const provider = new CognitoIdentityProvider({ region });

	const [apiToken] = useApiToken();
	const [oldPassword, setOldPassword] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const showSuccessSnackbar = useSnackbarOnSuccess('Password was changed');
	const user = useContext(UserContext).user;
	const queryClient = useQueryClient();

	const { mutate: changePassword, isLoading: isChangePasswordLoading } = useMutation(
		async () => {
			await provider.changePassword({
				AccessToken: apiToken?.AccessToken as string,
				PreviousPassword: oldPassword,
				ProposedPassword: newPassword,
			});

			setOldPassword('');
			setNewPassword('');
		},
		{
			onSuccess: showSuccessSnackbar,
			onError: useSnackbarOnError(),
		},
	);

	const { mutate: switchRole, isLoading: isSwitchRoleLoading } = useMutation(
		UserService.switchRole,
		{
			onSuccess: () => queryClient.invalidateQueries([entities.contextUser]),
			onError: useSnackbarOnError(),
		},
	);

	if (!user) {
		return <LinearProgress />;
	}

	return (
		<Container>
			<Grid container mt={5}>
				<Grid item container xs={5} justifyContent={'center'}>
					<WAvatar color={'primary'} />
				</Grid>
				<Grid item xs={7}>
					<Typography variant={'h6'}>First Name: {user.firstName}</Typography>
					<Typography variant={'h6'}>Last Name: {user.lastName}</Typography>
					<Typography variant={'h6'}>Email: {user.email}</Typography>
					<Typography variant={'h6'} mt={2} mb={1}>
						Role: {user.role}
					</Typography>
					<Button
						variant={'outlined'}
						size={'large'}
						disabled={isSwitchRoleLoading}
						fullWidth
						onClick={() => switchRole()}
					>
						Switch to {user.role === 'Renter' ? 'Landlord' : 'Renter'}
					</Button>

					<Grid container spacing={2} mt={4}>
						<Grid item xs={12} md={6}>
							<TextField
								value={oldPassword}
								fullWidth
								type={'password'}
								label={'Old Password'}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								value={newPassword}
								fullWidth
								type={'password'}
								label={'New Password'}
								onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant={'outlined'}
								fullWidth
								size={'small'}
								disabled={!oldPassword || !newPassword || isChangePasswordLoading}
								onClick={() => changePassword()}
							>
								Change Password
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}
