import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { useState, ChangeEvent, MouseEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

import { hashCognitoSecret } from 'shared/util';
import { useSnackbarOnError } from 'hooks/notistack';
import { UserService, RegisterUserRequest } from 'clients/CoreService';
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
	const [isCognitoLoading, setIsCognitoLoading] = useState<boolean>(false);
	const errorSnackbar = useSnackbarOnError();
	const router = useRouter();

	const { mutate: registerUser } = useMutation(
		(user: RegisterUserRequest) => {
			return UserService.register(user);
		},
		{
			onError: errorSnackbar,
			onSuccess: () => router.push('/auth/sign-in'),
		},
	);

	const onSubmit = async (e: MouseEvent) => {
		e.preventDefault();
		setIsCognitoLoading(true);

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

		try {
			await provider.signUp(params);
			registerUser({ firstName, lastName, email });
		} catch (e: any) {
			errorSnackbar(e);
		}

		setIsCognitoLoading(false);
	};

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
					<Button variant={'outlined'} onClick={onSubmit} disabled={isCognitoLoading}>
						Sign Up
					</Button>
				</AuthForm>
			</LayoutContainer>
		</Container>
	);
}
