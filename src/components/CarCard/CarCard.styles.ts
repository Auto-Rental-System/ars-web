import styled from 'styled-components';
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

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
`;

export const CarImageWrapper = styled.div`
	flex: 2;
	height: auto;
`;

export const CarImageMockup = styled.div`
	background: ${({ theme }) => theme.palette.grey['800']};
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;

	.image-mockup {
		height: 3rem;
		width: unset;
	}
`;

export const CarInfo = styled.div`
	width: 0;
	flex: 3;
	
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
  white-space: nowrap;
  text-overflow: ellipsis;
`;