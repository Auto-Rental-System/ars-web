import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, ChangeEvent, useEffect } from 'react';
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
import { hashCognitoSecret } from 'shared/util';
import { useSnackbarOnError } from 'hooks/notistack';

import { path as signInPath } from 'pages/auth/sign-in';
import { path as homePath } from 'pages/index';

export default function VerifyAccount() {
	const region: string = process.env.NEXT_PUBLIC_COGNITO_REGION || '';
	const clientId: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
	const clientSecret: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || '';
	const provider = new CognitoIdentityProvider({ region });
	const [code, setCode] = useState('');
	const router = useRouter();

	useEffect(() => {
		const email = router.query['email'];
		console.log({ query: router.query, email });

		if (typeof email !== 'string') {
			router.push(homePath);
		}
	}, [router]);

	const { mutate: verify, isLoading } = useMutation(
		() => {
			const email = router.query['email'] as string;

			return provider.confirmSignUp({
				ClientId: clientId,
				SecretHash: hashCognitoSecret(clientSecret, email, clientId),
				Username: email,
				ConfirmationCode: code,
			});
		},
		{
			onSuccess: () => router.push(signInPath),
			onError: useSnackbarOnError(),
		},
	);

	return (
		<Container>
			<LayoutContainer>
				<Typography variant={'h3'} align={'center'}>
					Confirm Sign Up
				</Typography>
				<AuthForm>
					<WTextField
						required
						label={'Code'}
						value={code}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
					/>
					<Button disabled={isLoading} variant={'outlined'} onClick={() => verify()}>
						Confirm
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
