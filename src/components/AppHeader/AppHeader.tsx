import * as React from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { entities } from 'consts/entities';
import { UserService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack/useSnackbarOnError';
import LogoIcon from 'assets/logo.svg';
import {
	PagesMenu,
	WToolbar,
	PageButton,
	SettingsMenu,
	PagesWrapper,
	MobilePagesWrapper,
	LogoTypography,
	LogoBlock,
	LogoWrapper,
	MobileLogoWrapper,
	AvatarButton,
} from './AppHeader.styles';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AvatarPopover({ name }: { name: string }) {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<div>
			<Tooltip title='Open settings'>
				<AvatarButton onClick={handleOpenUserMenu}>
					<Typography>{name}</Typography>
					<Avatar />
				</AvatarButton>
			</Tooltip>
			<SettingsMenu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
				{settings.map(setting => (
					<MenuItem key={setting} onClick={handleCloseUserMenu}>
						<Typography textAlign='center'>{setting}</Typography>
					</MenuItem>
				))}
			</SettingsMenu>
		</div>
	);
}

function Logo() {
	return (
		<Link href={'/'}>
			<LogoBlock>
				<Image src={LogoIcon} alt={'Rent Riders'} className={'logo-image'} />
				<LogoTypography>Rental System</LogoTypography>
			</LogoBlock>
		</Link>
	);
}

export default function AppHeader({ hideUser }: { hideUser?: boolean }) {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const { data: me } = useQuery(entities.me, UserService.getCurrent, {
		onError: useSnackbarOnError(),
		enabled: !hideUser,
	});

	console.log(me);

	return (
		<AppBar color={'primary'} position={'static'}>
			<Container maxWidth='xl'>
				<WToolbar>
					<LogoWrapper>
						<Logo />
					</LogoWrapper>

					<MobilePagesWrapper>
						<IconButton size='large' onClick={handleOpenNavMenu} color={'inherit'}>
							<MenuIcon />
						</IconButton>
						<PagesMenu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography textAlign='center'>{page}</Typography>
								</MenuItem>
							))}
						</PagesMenu>
					</MobilePagesWrapper>
					<MobileLogoWrapper>
						<Logo />
					</MobileLogoWrapper>

					<PagesWrapper>
						{pages.map(page => (
							<PageButton key={page} onClick={handleCloseNavMenu}>
								{page}
							</PageButton>
						))}
					</PagesWrapper>

					{!hideUser && <AvatarPopover name={me ? `${me.firstName} ${me.lastName}` : ''} />}
				</WToolbar>
			</Container>
		</AppBar>
	);
}
