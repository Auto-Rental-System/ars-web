import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';

import { CarService, Fuel, Gearbox } from 'clients/CoreService';
import { path as carsListPath } from 'pages/cars/index';
import { useSnackbarOnError } from 'hooks/notistack';
import Camera from 'assets/icons/camera.svg';
import { AddImage } from './AddCar.styles';

export default function AddCar() {
	const router = useRouter();
	const [brand, setBrand] = useState<string>('');
	const [model, setModel] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [fuel, setFuel] = useState<Fuel>('Petrol');
	const [gearbox, setGearbox] = useState<Gearbox>('Automatic');
	const [engineCapacity, setEngineCapacity] = useState<number>(2);
	const [fuelConsumption, setFuelConsumption] = useState<number>(8);
	const [pledge, setPledge] = useState<number>(1000);
	const [price, setPrice] = useState<number>(10);

	const { mutate: createCar, isLoading } = useMutation(
		() =>
			CarService.create({
				brand,
				model,
				description,
				fuel,
				gearbox,
				engineCapacity,
				fuelConsumption,
				pledge,
				price,
			}),
		{
			onSuccess: () => router.push(carsListPath),
			onError: useSnackbarOnError(),
		},
	);

	return (
		<>
			{isLoading && <LinearProgress />}
			<Container>
				<Typography variant={'h3'} mt={5} mb={3}>
					Add Car
				</Typography>
				<Grid container spacing={2}>
					<Grid item container xs={6} spacing={2}>
						<Grid item xs={12}>
							<TextField
								label={'Brand'}
								value={brand}
								onChange={e => setBrand(e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label={'Model'}
								value={model}
								onChange={e => setModel(e.target.value)}
								fullWidth
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label={'Description'}
								value={description}
								onChange={e => setDescription(e.target.value)}
								fullWidth
								multiline
								rows={7}
							/>
						</Grid>
					</Grid>
					<Grid item flex={1}>
						<AddImage>
							<Image src={Camera} alt={'Camera'} className={'camera-icon'} />
						</AddImage>
					</Grid>
					<Grid item xs={6}>
						<Autocomplete
							renderInput={params => <TextField label={'Fuel'} {...params} />}
							options={['Petrol', 'Diesel', 'Hybrid', 'Electric'] as Array<Fuel>}
							value={fuel}
							disableClearable
							onChange={(_, newFuel) => setFuel(newFuel as Fuel)}
						/>
					</Grid>
					<Grid item xs={6}>
						<Autocomplete
							renderInput={params => <TextField label={'Gearbox'} {...params} />}
							options={['Manual', 'Automatic'] as Array<Gearbox>}
							value={gearbox}
							disableClearable
							onChange={(_, newGearbox) => setGearbox(newGearbox as Gearbox)}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={'Engine Capacity'}
							type={'number'}
							fullWidth
							inputProps={{
								inputMode: 'decimal',
								pattern: '[0-9].[0-9]',
								step: '0.1',
								min: 0.1,
								max: 9.9,
							}}
							InputLabelProps={{
								shrink: true,
							}}
							value={engineCapacity}
							onChange={e => {
								const value = parseFloat(e.target.value);
								setEngineCapacity(value > 9.9 ? 9.9 : parseFloat(value.toFixed(2)));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={'Fuel Consumption'}
							type={'number'}
							fullWidth
							inputProps={{
								inputMode: 'decimal',
								pattern: '[0-9].[0-9]',
								step: '0.1',
								min: 0.1,
								max: 99.9,
							}}
							InputLabelProps={{
								shrink: true,
							}}
							value={fuelConsumption}
							onChange={e => {
								const value = parseFloat(e.target.value);
								setFuelConsumption(value > 99.9 ? 99.9 : parseFloat(value.toFixed(1)));
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={'Pledge'}
							type={'number'}
							fullWidth
							InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
							InputLabelProps={{
								shrink: true,
							}}
							value={pledge}
							onChange={e => {
								const value = parseInt(e.target.value);
								setPledge(value > 0 ? value : 1);
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={'Price'}
							type={'number'}
							fullWidth
							InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment> }}
							InputLabelProps={{
								shrink: true,
							}}
							value={price}
							onChange={e => {
								const value = parseInt(e.target.value);
								setPrice(value > 0 ? value : 1);
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							disabled={
								!brand ||
								!model ||
								!description ||
								!fuel ||
								!gearbox ||
								!engineCapacity ||
								!fuelConsumption ||
								!pledge ||
								!price ||
								isLoading
							}
							onClick={() => createCar()}
							size={'large'}
							variant={'outlined'}
							fullWidth
						>
							SUBMIT
						</Button>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
