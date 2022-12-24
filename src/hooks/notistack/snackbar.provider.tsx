import React from 'react';
import { SnackbarProvider as NotistackProvider, useSnackbar, SnackbarKey } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({ id }: { id: SnackbarKey }) => {
	const { closeSnackbar } = useSnackbar();
	return (
		<IconButton style={{ color: 'white' }} onClick={() => closeSnackbar(id)} size='large'>
			<CloseIcon color='inherit' />
		</IconButton>
	);
};

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => (
	<NotistackProvider
		maxSnack={3}
		hideIconVariant
		preventDuplicate
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		action={key => <CloseButton key={key} id={key} />}
	>
		{children}
	</NotistackProvider>
);
