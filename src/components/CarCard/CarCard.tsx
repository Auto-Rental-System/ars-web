import Image from 'next/image';
import Typography from '@mui/material/Typography';

import Camera from 'assets/icons/camera.svg';
import { CarCharacteristics } from 'components/CarCharacteristics';

import { Container, CarInfo, CarImageWrapper, CarDescription } from './CarCard.styles';
import { CarCardProps } from '.';

export default function CarCard({ car, ...rest }: CarCardProps) {
	return (
		<Container {...rest}>
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
				<CarCharacteristics {...car} />
				<CarDescription>{car.description}</CarDescription>
			</CarInfo>
		</Container>
	);
}
