import Image from 'next/image';
import Typography from '@mui/material/Typography';

import {
	Container,
	CarInfo,
	CarImageWrapper,
	CarCharacteristics,
	CarDescription,
} from './CarCard.styles';
import { CarCardProps } from '.';

import Camera from 'assets/icons/camera.svg';
import Fuel from 'assets/icons/fuel.svg';
import Engine from 'assets/icons/engine.svg';
import Fire from 'assets/icons/fire.svg';
import Gearbox from 'assets/icons/gearbox.svg';

export default function CarCard({ car }: CarCardProps) {
	return (
		<Container>
			<CarImageWrapper>
				{car.titleImage ? (
					<Image src={car.titleImage.url} fill priority objectFit={'cover'} alt={car.brand} />
				) : (
					<Image src={Camera} alt={'Camera'} className={'image-mockup'} />
				)}
			</CarImageWrapper>
			<CarInfo>
				<Typography variant={'h6'}>
					{car.brand} {car.model}
				</Typography>
				<Typography color={'primary'} variant={'h5'}>
					$ {car.price}
				</Typography>
				<CarCharacteristics>
					<div className='characteristic'>
						<Image className={'icon'} src={Fuel} alt={'Fuel'} />
						<Typography variant={'body2'}>{car.fuel}</Typography>
					</div>
					<div className='characteristic'>
						<Image className={'icon'} src={Engine} alt={'Engine'} />
						<Typography variant={'body2'}>{car.engineCapacity.toFixed(2)} L</Typography>
					</div>
					<div className='characteristic'>
						<Image className={'icon'} src={Fire} alt={'Fire'} />
						<Typography variant={'body2'}>{car.fuelConsumption.toFixed(1)} l/100km</Typography>
					</div>
					<div className='characteristic'>
						<Image className={'icon'} src={Gearbox} alt={'Gearbox'} />
						<Typography variant={'body2'}>{car.gearbox}</Typography>
					</div>
				</CarCharacteristics>
				<CarDescription>{car.description}</CarDescription>
			</CarInfo>
		</Container>
	);
}
