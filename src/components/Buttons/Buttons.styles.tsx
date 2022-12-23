import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import MaterialIconButton from '@mui/material/IconButton';
import styled from 'styled-components';

const ContainedButton: React.FC<ButtonProps> = React.forwardRef((props, ref) => (
	<Button ref={ref} variant='contained' size='large' disableElevation {...props} />
));

const OutlinedButton: React.FC<ButtonProps> = React.forwardRef((props, ref) => (
	<Button ref={ref} variant='outlined' size='large' disableElevation {...props} />
));

const GenericContainedButton = styled(ContainedButton)`
	padding: 0.45rem 1.5rem;
	font-size: 1rem;
	font-weight: 500;
	border-radius: 2rem;
	text-align: center;
	box-shadow: none;
	text-transform: none;

	&::first-letter {
		text-transform: uppercase;
	}

	&[disabled] {
		opacity: 0.2;
	}
`;

const GenericOutlinedButton = styled(GenericContainedButton).attrs({ as: OutlinedButton })``;

export const Primary: React.FC<ButtonProps> = props => <GenericContainedButton color={'primary'} {...props} />;

export const Secondary = styled(GenericOutlinedButton)`
	&,
	&[disabled],
	&:hover {
		border: none;
	}
`;

export const Outlined = styled(GenericOutlinedButton).attrs({
	color: 'primary',
})``;

export const IconButton = styled(MaterialIconButton)`
	margin: 0;
	padding: 0.25rem;
	border-radius: 10px;
	&.Mui-disabled {
		opacity: 0.5;
	}
`;
