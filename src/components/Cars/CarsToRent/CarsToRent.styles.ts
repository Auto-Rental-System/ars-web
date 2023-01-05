import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';

export const WLinearProgress = styled(LinearProgress)``;

export const ListHolder = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

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
