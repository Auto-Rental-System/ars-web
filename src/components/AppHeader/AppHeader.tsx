import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { entities } from 'consts/entities';
import { useRole } from 'context/UserContext';
import { UserService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notistack';
import { useApiToken, useLogout } from 'hooks/auth';
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
import { path as rentalOrdersPath } from 'pages/reports/rental-orders';
import { path as myCarsPath } from 'pages/reports/my-cars';

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

function ReportPopover() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const router = useRouter();
	const role = useRole();

	const items: Array<{ name: string; onClick: () => any; hidden?: boolean }> = [
		{
			name: 'My Cars',
			onClick: () => router.push(myCarsPath),
			hidden: role !== 'Landlord',
		},
		{
			name: 'Rental orders',
			onClick: () => router.push(rentalOrdersPath),
		},
	];

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<PageButton onClick={handleOpenMenu}>Reports</PageButton>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
				{items
					.filter(item => !item.hidden)
					.map(item => (
						<MenuItem key={item.name} onClick={item.onClick}>
							<Typography textAlign='center'>{item.name}</Typography>
						</MenuItem>
					))}
			</Menu>
		</>
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
	const role = useRole();
	const [apiToken] = useApiToken();

	const pages: Array<{ name: string; onClick: () => any; hidden?: boolean; Component?: React.FC }> =
		[
			{ name: 'Cars', onClick: () => router.push(carsPath) },
			{ name: 'Reports', hidden: !role, onClick: () => {}, Component: ReportPopover },
		];

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const { data: me } = useQuery([entities.me], UserService.getCurrent, {
		onError: useSnackbarOnError(),
		enabled: !hideUser && !!apiToken,
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
										<MenuItem key={page.name} onClick={page.onClick}>
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
							{pages.map(page => {
								const Component = page.Component;
								return Component ? (
									<Component key={page.name} />
								) : (
									<PageButton key={page.name} onClick={page.onClick}>
										{page.name}
									</PageButton>
								);
							})}
						</PagesWrapper>
					)}

					{!hideUser && <AvatarPopover name={me ? `${me.firstName} ${me.lastName}` : ''} />}
				</WToolbar>
			</Container>
		</AppBar>
	);
}
