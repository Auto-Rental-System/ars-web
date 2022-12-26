import { useState, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { Container, WTextField, AuthForm, LayoutContainer } from 'components/Auth/SignUp/SignUp.styles';
import { useApiToken } from 'hooks/auth/useApiToken';
import { hashCognitoSecret } from 'shared/util';
import { useSnackbarOnError } from 'hooks/notistack/useSnackbarOnError';

export default function SignIn() {
	const region: string = process.env.NEXT_PUBLIC_COGNITO_REGION || '';
	const clientId: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
	const clientSecret: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isCognitoLoading, setIsCognitoLoading] = useState<boolean>(false);
	const [, setApiToken] = useApiToken();
	const errorSnackbar = useSnackbarOnError();

	const onSubmit = async (e: any) => {
		e.preventDefault();
		setIsCognitoLoading(true);

		const params = {
			ClientId: clientId,
			AuthFlow: 'USER_PASSWORD_AUTH',
			AuthParameters: {
				USERNAME: email,
				PASSWORD: password,
				SECRET_HASH: hashCognitoSecret(clientSecret, email, clientId),
			},
		};

		try {
			const res = await provider.initiateAuth(params);

			setApiToken({
				AccessToken: res.AuthenticationResult?.AccessToken,
				RefreshToken: res.AuthenticationResult?.RefreshToken,
				username: email,
			});
		} catch (e) {
			errorSnackbar(e);
		}

		setIsCognitoLoading(false);
	};

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
					<Button disabled={isCognitoLoading} variant={'outlined'} onClick={onSubmit}>
						Sign In
					</Button>
				</AuthForm>
			</LayoutContainer>
		</Container>
	);
}
