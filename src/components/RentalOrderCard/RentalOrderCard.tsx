import dayjs from 'dayjs';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import CameraIcon from 'assets/icons/camera.svg';
import TimeIcon from 'assets/icons/time.svg';
import { useRole } from 'context/UserContext';
import { Container, CarImageWrapper } from 'components/CarCard/CarCard.styles';

import { RentalOrderCheckpoint, RentalOrderInfo } from './RentalOrderCard.styles';
import { RentalOrderCardProps } from '.';

export default function RentalOrderCard({
	car,
	payment,
	rentalOrder,
	...rest
}: RentalOrderCardProps) {
	const role = useRole();
	return (
		<Container {...rest}>
			<CarImageWrapper>
				{car.titleImage ? (
					<Image src={car.titleImage.url} fill priority objectFit={'cover'} alt={car.brand} />
				) : (
					<Image src={CameraIcon} alt={'Camera'} className={'image-mockup'} />
				)}
			</CarImageWrapper>
			<RentalOrderInfo>
				<Typography variant={'h5'}>Rental Order #{rentalOrder.id}</Typography>
				<Typography variant={'body1'} color={'textSecondary'}>
					{car.brand} {car.model}
				</Typography>
				<Typography color={'primary'} variant={'h5'} mt={0.5} mb={1.5}>
					$ {role === 'Renter' ? payment.grossValue.toFixed(2) : payment.netValue.toFixed(2)}
				</Typography>
				<RentalOrderCheckpoint>
					<Image src={TimeIcon} alt={'Time'} />
					<Typography variant={'body2'}>
						{dayjs(rentalOrder.startAt).format('DD/MM/YYYY')} -{' '}
						{dayjs(rentalOrder.endAt).format('DD/MM/YYYY')}
					</Typography>
				</RentalOrderCheckpoint>
				<RentalOrderCheckpoint>
					<MonetizationOnIcon color={'primary'} />
					<Typography variant={'body2'}>Price per day: ${car.price.toFixed(2)}</Typography>
				</RentalOrderCheckpoint>
				<RentalOrderCheckpoint>
					<DateRangeIcon color={'primary'} />
					<Typography variant={'body2'}>
						Total days rented: {dayjs(rentalOrder.endAt).diff(rentalOrder.startAt, 'days') + 1} Days
					</Typography>
				</RentalOrderCheckpoint>
			</RentalOrderInfo>
		</Container>
	);
}
