import styled from 'styled-components';

export const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 0.5rem;

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
