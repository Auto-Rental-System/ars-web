import styled from 'styled-components';
import ButtonBase from '@mui/material/ButtonBase';

export const AddImage = styled(ButtonBase)`
	background: ${({ theme }) => theme.palette.grey['800']};
	border-radius: 0.5rem;
	width: 100%;
	height: 100%;

	.camera-icon {
		width: 4rem;
		height: 4rem;
	}
`;
