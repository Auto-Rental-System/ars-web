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
import CloseIcon from '@mui/icons-material/Close';

import { CarService, Fuel, Gearbox } from 'clients/CoreService';
import { path as carsListPath } from 'pages/cars/index';
import { useSnackbarOnError } from 'hooks/notistack';
import Camera from 'assets/icons/camera.svg';
import {
	AddImage,
	ImageWrapper,
	MainImageWrapper,
	MainImageCheckbox,
	CloseButton,
} from './AddCar.styles';
import { sendFile } from './AddCar.utils';

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
	const [images, setImages] = useState<Array<{ file: File; src: string }>>([]);
	const [titleImageName, setTitleImageName] = useState<string>('');
	const onError = useSnackbarOnError();

	const { mutate: createCar, isLoading } = useMutation(
		async () => {
			const car = await CarService.create({
				brand,
				model,
				description,
				fuel,
				gearbox,
				engineCapacity,
				fuelConsumption,
				pledge,
				price,
			});

			const filenames = images.map(image => image.file.name);
			const postUrls = await CarService.getImagesSignedPostUrls(car.id, filenames);

			await Promise.all(
				images.map(async image => {
					try {
						const url = postUrls.list.find(u => u.filename === image.file.name);
						await sendFile(url!, image.file);
					} catch (e) {
						onError(e);
					}
				}),
			);

			return CarService.update(car.id, {
				...car,
				images: images.map(image => ({
					filename: image.file.name,
					isTitle: image.file.name === titleImageName,
				})),
			});
		},
		{
			onSuccess: () => router.push(carsListPath),
			onError: onError,
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
					<Grid item xs={12} container spacing={1} justifyContent={'flex-start'}>
						{images.map(image => (
							<Grid item>
								<ImageWrapper onClick={() => setTitleImageName(image.file.name)}>
									<img src={image.src} alt={'Image'} />
									<MainImageWrapper>
										<MainImageCheckbox checked={image.file.name === titleImageName} />
										<Typography variant={'subtitle2'} color={'primary'}>
											Main Image
										</Typography>
									</MainImageWrapper>
									<CloseButton
										onClick={e => {
											e.stopPropagation();
											setImages(images => images.filter(i => i.file.name !== image.file.name));

											if (image.file.name === titleImageName) {
												setTitleImageName(images[0]?.file.name || '');
											}
										}}
									>
										<CloseIcon />
									</CloseButton>
								</ImageWrapper>
							</Grid>
						))}
						<Grid item>
							<label>
								<AddImage>
									<Image src={Camera} alt={'Camera'} className={'camera-icon'} />
									<input
										type={'file'}
										multiple
										onChange={e => {
											const files = Array.from(e.target.files || []);

											files.forEach(file => {
												const reader = new FileReader();
												reader.readAsDataURL(file);
												reader.onloadend = function (e) {
													setImages(
														images =>
															[...images, { file, src: reader.result }] as Array<{
																file: File;
																src: string;
															}>,
													);
												};
											});

											setTitleImageName(titleImageName || images[0]?.file.name || '');
										}}
									/>
									<Typography variant={'subtitle2'} color={'primary'}>
										Add Image
									</Typography>
								</AddImage>
							</label>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label={'Brand'}
							value={brand}
							onChange={e => setBrand(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
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
							rows={4}
						/>
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
							InputLabelProps={{ shrink: true }}
							InputProps={{ startAdornment: <InputAdornment position='start'>L</InputAdornment> }}
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
							InputLabelProps={{ shrink: true }}
							InputProps={{
								startAdornment: <InputAdornment position='start'>l/100km</InputAdornment>,
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
