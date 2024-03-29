import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const Container = styled.div`
	width: 100%;
	flex: 1;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const LayoutContainer = styled.div`
	border-radius: 1rem;
	border: 1px solid ${({ theme }) => theme.palette.primary.main};
	padding: 1.5rem;

	width: 35rem;
	max-width: 80%;
`;

export const AuthForm = styled.div`
	margin-top: 3rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1rem;
`;

export const WTextField = styled(TextField).attrs({
	fullWidth: true,
	variant: 'outlined',
})``;
