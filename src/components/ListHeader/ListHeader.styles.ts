import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

export const OrderButton = styled(IconButton).attrs({
	variant: 'outlined',
})`
	display: flex;
	height: 100%;
	gap: 0.3rem;

	.sort-icon {
		height: 1.2rem;
		width: 1.2rem;
	}
`;

export const AddButton = styled(Button).attrs({
	variant: 'contained',
})`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.4rem 1rem;
	margin-left: auto;
`;

export const Header = styled.div`
	display: flex;
	justify-content: flex-start;
	gap: 0.5rem;
	align-items: center;
	margin-bottom: 1rem;
`;

export const OrderByAutocomplete = styled(Autocomplete)`
	width: 15rem;
`;
