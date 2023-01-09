import * as React from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { useSnackbarOnError } from 'hooks/notistack';
import { useLogout } from 'hooks/auth';
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

import { path as carsPath } from 'pages/cars/index';
import { path as profilePath } from 'pages/profile';

function AvatarPopover({ name }: { name: string }) {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const logout = useLogout();
	const router = useRouter();
	const settings: Array<{ name: string; onClick: () => any }> = [
		{
			name: 'Profile',
			onClick: () => router.push(profilePath),
		},
		{
			name: 'Logout',
			onClick: () => {
				setAnchorElUser(null);
				return logout();
			},
		},
	];

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
					<Typography className={'name'}>{name}</Typography>
					<Avatar />
				</AvatarButton>
			</Tooltip>
			<SettingsMenu
				anchorEl={anchorElUser}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{settings.map(setting => (
					<MenuItem key={setting.name} onClick={setting.onClick}>
						<Typography textAlign='center'>{setting.name}</Typography>
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

export default function AppHeader({
	hideUser,
	hideNavigation,
}: {
	hideUser?: boolean;
	hideNavigation?: boolean;
}) {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const router = useRouter();

	const pages: Array<{ name: string; href: string }> = [{ name: 'Cars', href: carsPath }];

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

	return (
		<AppBar color={'primary'} position={'static'}>
			<Container maxWidth='xl'>
				<WToolbar>
					<LogoWrapper>
						<Logo />
					</LogoWrapper>

					<MobilePagesWrapper>
						{!hideNavigation && (
							<>
								<IconButton size='large' onClick={handleOpenNavMenu} color={'inherit'}>
									<MenuIcon />
								</IconButton>
								<PagesMenu
									anchorEl={anchorElNav}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
								>
									{pages.map(page => (
										<MenuItem key={page.name} onClick={() => router.push(page.href)}>
											<Typography textAlign='center'>{page.name}</Typography>
										</MenuItem>
									))}
								</PagesMenu>
							</>
						)}
					</MobilePagesWrapper>
					<MobileLogoWrapper>
						<Logo />
					</MobileLogoWrapper>

					{!hideNavigation && (
						<PagesWrapper>
							{pages.map(page => (
								<PageButton key={page.name} onClick={() => router.push(page.href)}>
									{page.name}
								</PageButton>
							))}
						</PagesWrapper>
					)}

					{!hideUser && <AvatarPopover name={me ? `${me.firstName} ${me.lastName}` : ''} />}
				</WToolbar>
			</Container>
		</AppBar>
	);
}
