import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import ButtonBase from '@mui/material/ButtonBase';

export const ImageWrapper = styled(ButtonBase)`
	border: 1px solid ${({ theme }) => theme.palette.primary.main};
	border-radius: 0.5rem;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 8rem;
	height: 8rem;
	position: relative;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const MainImageWrapper = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0.1rem 0;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;

	background: ${({ theme }) => theme.palette.primary.contrastText};
	border-top: 1px solid ${({ theme }) => theme.palette.primary.main};
`;

export const MainImageCheckbox = styled(Checkbox)`
	padding: 0.2rem;
	.MuiCheckbox-root {
		padding: 0.1rem;
	}

	.MuiSvgIcon-root {
		width: 0.8rem;
		height: 0.8rem;
	}
`;

export const ImageName = styled(Typography).attrs({
	variant: 'subtitle2',
	color: 'primary',
})`
	padding: 0 0.3rem;
	background: ${({ theme }) => theme.palette.primary.contrastText};
	border-top: 1px solid ${({ theme }) => theme.palette.primary.main};

	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;

export const CloseButton = styled(IconButton)`
	position: absolute;
	top: 0;
	right: 0;
`;

export const AddImage = styled.label`
	border: 1px dashed ${({ theme }) => theme.palette.primary.main};
	border-radius: 0.5rem;
	overflow: hidden;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 8rem;
	height: 8rem;
	background: ${({ theme }) => theme.palette.grey['800']};

	&:hover {
		cursor: pointer;
		border-style: solid;
	}

	input[type='file'] {
		display: none;
	}

	.camera-icon {
		width: 4rem;
		height: 4rem;
	}
`;
