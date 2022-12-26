import { useState, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Container, WTextField, AuthForm, LayoutContainer } from 'components/Auth/SignUp/SignUp.styles';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = () => {
		console.log('submit', { email, password });
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
					<Button variant={'outlined'} onClick={onSubmit}>
						Sign In
					</Button>
				</AuthForm>
			</LayoutContainer>
		</Container>
	);
}
