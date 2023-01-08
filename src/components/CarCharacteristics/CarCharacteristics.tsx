import Image from 'next/image';
import Typography from '@mui/material/Typography';

import Fuel from 'assets/icons/fuel.svg';
import Engine from 'assets/icons/engine.svg';
import Fire from 'assets/icons/fire.svg';
import Gearbox from 'assets/icons/gearbox.svg';

import { Container } from './CarCharacteristics.styles';
import { CarCharacteristicsProps } from '.';

export default function CarCharacteristics({
	fuel,
	engineCapacity,
	fuelConsumption,
	gearbox,
}: CarCharacteristicsProps) {
	return (
		<Container>
			<div className='characteristic'>
				<Image className={'icon'} src={Fuel} alt={'Fuel'} />
				<Typography variant={'body2'}>{fuel}</Typography>
			</div>
			<div className='characteristic'>
				<Image className={'icon'} src={Engine} alt={'Engine'} />
				<Typography variant={'body2'}>{engineCapacity.toFixed(2)} L</Typography>
			</div>
			<div className='characteristic'>
				<Image className={'icon'} src={Fire} alt={'Fire'} />
				<Typography variant={'body2'}>{fuelConsumption.toFixed(1)} l/100km</Typography>
			</div>
			<div className='characteristic'>
				<Image className={'icon'} src={Gearbox} alt={'Gearbox'} />
				<Typography variant={'body2'}>{gearbox}</Typography>
			</div>
		</Container>
	);
}
