import { useState, ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Container, WTextField, AuthForm, LayoutContainer } from './SignUp.styles';

export default function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = () => {
		console.log('submit', { firstName, lastName, email, password });
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
					<Button variant={'outlined'} onClick={onSubmit}>
						Sign Up
					</Button>
				</AuthForm>
			</LayoutContainer>
		</Container>
	);
}
