import Link from 'next/link';
import { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-query';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import {
	Container,
	WTextField,
	AuthForm,
	LayoutContainer,
} from 'components/Auth/SignUp/SignUp.styles';
import { useApiToken } from 'hooks/auth';
import { hashCognitoSecret } from 'shared/util';
import { useSnackbarOnError } from 'hooks/notistack';
import { path as signUpPath } from 'pages/auth/sign-up';

export default function SignIn() {
	const region: string = process.env.NEXT_PUBLIC_COGNITO_REGION || '';
	const clientId: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
	const clientSecret: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [, setApiToken] = useApiToken();

	const { mutate: signIn, isLoading } = useMutation(
		() => {
			const params = {
				ClientId: clientId,
				AuthFlow: 'USER_PASSWORD_AUTH',
				AuthParameters: {
					USERNAME: email,
					PASSWORD: password,
					SECRET_HASH: hashCognitoSecret(clientSecret, email, clientId),
				},
			};

			return provider.initiateAuth(params);
		},
		{
			onSuccess: res => {
				setApiToken({
					AccessToken: res.AuthenticationResult?.AccessToken,
					RefreshToken: res.AuthenticationResult?.RefreshToken,
					username: email,
				});
			},
			onError: useSnackbarOnError(),
		},
	);

	return (
		<Container>
			<LayoutContainer>
				<Typography variant={'h3'} align={'center'}>
					Sign In
				</Typography>
				<AuthForm>
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
					<Button disabled={isLoading} variant={'outlined'} onClick={() => signIn()}>
						Sign In
					</Button>
					<Link href={signUpPath}>
						<Typography color={'primary'} mt={0}>
							Don't have an account? Sign Up
						</Typography>
					</Link>
				</AuthForm>
			</LayoutContainer>
		</Container>
	);
}
