import Router from 'next/router';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useState, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { hashCognitoSecret } from 'shared';
import { useSnackbarOnError } from 'hooks/notistack';
import { UserService } from 'clients/CoreService';
import { path as verifyAccountPath } from 'pages/auth/verify';
import { path as signInPath } from 'pages/auth/sign-in';
import { Container, WTextField, AuthForm, LayoutContainer } from './SignUp.styles';

export default function SignUp() {
	const region: string = process.env.NEXT_PUBLIC_COGNITO_REGION || '';
	const clientId: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
	const clientSecret: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mutate: registerUser, isLoading } = useMutation(
		async () => {
			const params = {
				ClientId: clientId,
				Password: password,
				Username: email,
				SecretHash: hashCognitoSecret(clientSecret, email, clientId),
				UserAttributes: [
					{
						Name: 'email',
						Value: email,
					},
				],
			};

			await provider.signUp(params);
			return UserService.register({
				firstName,
				lastName,
				email,
			});
		},
		{
			onError: useSnackbarOnError(),
			onSuccess: () => Router.push({ pathname: verifyAccountPath, query: { email } }),
		},
	);

	return (
		<Container>
			<LayoutContainer>
				<Typography variant={'h3'} align={'center'}>
					Sign Up
				</Typography>
				<AuthForm>
					<WTextField
						required
						label={'First Name'}
						value={firstName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
					/>
					<WTextField
						required
						label={'Last Name'}
						value={lastName}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
					/>
					<WTextField
						required
						label={'Email'}
						value={email}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
					<WTextField
						required
						type={'password'}
						label={'Password'}
						value={password}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
					<Button
						variant={'outlined'}
						onClick={e => {
							e.preventDefault();
							registerUser();
						}}
						disabled={isLoading}
					>
						Sign Up
					</Button>
					<Link href={signInPath}>
						<Typography color={'primary'} mt={0}>
							Already have an account? Sign In
						</Typography>
					</Link>
				</AuthForm>
			</LayoutContainer>
		</Container>
	);
}
