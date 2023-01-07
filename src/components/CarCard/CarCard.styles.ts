import styled from 'styled-components';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

export const Container = styled(ButtonBase)`
	width: 100%;
	text-align: unset;

	border-radius: 0.5rem;
	padding: 1rem;
	border: 1px solid ${({ theme }) => theme.palette.primary.main};

	display: flex;
	flex-direction: row;
	gap: 1.5rem;
	align-items: normal;

	transition-duration: 0.2s;

	&:hover {
		background: ${({ theme }) => theme.colors.lightPrimary};
	}
`;

export const CarImageWrapper = styled.div`
	flex: 1;
	height: auto;
	background: ${({ theme }) => theme.palette.grey['800']};
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	.image-mockup {
		height: 3rem;
		width: unset;
	}
`;

export const CarInfo = styled.div`
	width: 0;
	flex: 2;

	display: flex;
	flex-direction: column;
	position: relative;
`;

export const CarCharacteristics = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 0.5rem;
	margin-top: 1.4rem;

	.characteristic {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		.icon {
			height: 1.6rem;
			width: unset;
		}
	}
`;

export const CarDescription = styled(Typography)`
	margin-top: 1rem;
	overflow: hidden;
	display: -webkit-box;
	// to display description in 2 lines
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
`;
