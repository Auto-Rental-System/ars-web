import styled from 'styled-components';

export const RentalOrderInfo = styled.div`
	width: 0;
	flex: 2;

	display: flex;
	flex-direction: column;
	position: relative;
`;

export const RentalOrderCheckpoint = styled.div`
	display: flex;
	gap: 0.3rem;
	align-items: center;
	justify-content: flex-start;
	margin-top: 0.3rem;

	img {
		width: 1.5rem;
		height: 1.5rem;
		color: ${({ theme }) => theme.palette.text.primary};
	}
`;
