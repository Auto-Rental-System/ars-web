import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { CustomArrowProps } from 'react-slick';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import ArrowBack from '@mui/icons-material/ArrowBackIosNew';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CreateOrderActions, CreateOrderData } from '@paypal/paypal-js';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-calendar/dist/Calendar.css';

import { CarCharacteristics } from 'components/CarCharacteristics';
import { CarService, RentalOrderResponse, UserResponse } from 'clients/CoreService';
import { useSnackbarOnError, useSnackbarOnSuccess } from 'hooks/notistack';
import { entities } from 'consts/entities';
import { useRole, useUser } from 'context/UserContext';
import { WSlider, Slide, NextButton, PrevButton, WCalendar } from './SingleCar.styles';
import { SingleCarProps } from '.';

function ArrowNext({ onClick }: CustomArrowProps) {
	return (
		<NextButton onClick={onClick}>
			<ArrowForward color={'primary'} fontSize={'large'} />
		</NextButton>
	);
}

function ArrowPrev({ onClick }: CustomArrowProps) {
	return (
		<PrevButton onClick={onClick}>
			<ArrowBack color={'primary'} fontSize={'large'} />
		</PrevButton>
	);
}

function getActiveRentalOrder(
	date: dayjs.Dayjs,
	rentalOrders: Array<RentalOrderResponse>,
): RentalOrderResponse | undefined {
	return rentalOrders.find(
		order =>
			(date.isBefore(order.endAt, 'day') && date.isAfter(order.startAt, 'day')) ||
			date.isSame(order.startAt, 'day') ||
			date.isSame(order.endAt, 'day'),
	);
}

function getCalendarDateClassnames(
	date: Date,
	rentalOrders: Array<RentalOrderResponse>,
	user?: UserResponse,
): string {
	const wDate = dayjs(date);
	const activeRentalOrder = getActiveRentalOrder(wDate, rentalOrders);

	return classNames({
		active: !!activeRentalOrder,
		'first-day': activeRentalOrder && wDate.isSame(activeRentalOrder.startAt, 'day'),
		'last-day': activeRentalOrder && wDate.isSame(activeRentalOrder.endAt, 'day'),
		'rented-by-me': activeRentalOrder?.userId === user?.id,
	});
}

export default function SingleCar({ car }: SingleCarProps) {
	const [isRentMenuOpened, setIsRentMenuOpened] = useState<boolean>(false);
	const [rentStartAt, setRentStartAt] = useState<dayjs.Dayjs | null>(null);
	const [rentEndAt, setRentEndAt] = useState<dayjs.Dayjs | null>(null);
	const [activeStartDate, setActiveStartDate] = useState<dayjs.Dayjs>(dayjs().startOf('month'));
	const totalPrice = useMemo(
		() => (rentStartAt && rentEndAt ? (rentEndAt.diff(rentStartAt, 'days') + 1) * car.price : 0),
		[rentStartAt, rentEndAt],
	);
	const queryClient = useQueryClient();
	const role = useRole();
	const user = useUser();
	const showSuccessSnackbar = useSnackbarOnSuccess('Car was rented');

	const { data: rentalOrders, isLoading: rentalOrdersLoading } = useQuery(
		[entities.rentalOrders, car.id],
		() => {
			const to = activeStartDate.endOf('month');
			return CarService.getRentalOrders(car.id, activeStartDate.toISOString(), to.toISOString());
		},
		{
			refetchOnWindowFocus: false,
			onError: useSnackbarOnError(),
		},
	);

	const { mutate: rentCar, isLoading: rentCarLoading } = useMutation(
		({ orderId }: { orderId: string }) =>
			CarService.rent(car.id, {
				startAt: rentStartAt?.toISOString() as string,
				endAt: rentEndAt?.toISOString() as string,
				orderId,
			}),
		{
			onSuccess: () => {
				showSuccessSnackbar();
				setRentStartAt(null);
				setRentEndAt(null);
				return queryClient.invalidateQueries([entities.singleCar]);
			},
			onError: useSnackbarOnError(),
		},
	);

	const createOrder = useCallback(
		async (data: CreateOrderData, actions: CreateOrderActions) => {
			return actions.order.create({
				purchase_units: [
					{
						amount: {
							value: totalPrice.toString(),
							currency_code: 'USD',
						},
					},
				],
				application_context: {
					brand_name: 'Auto Rental System',
					shipping_preference: 'NO_SHIPPING',
				},
			});
		},
		[totalPrice],
	);

	const isLoading = rentalOrdersLoading || rentCarLoading;

	const renderDatePickerDay = (
		date: dayjs.Dayjs,
		selectedDates: Array<dayjs.Dayjs>,
		pickersDayProps: PickersDayProps<dayjs.Dayjs>,
	) => {
		const activeRentalOrder = getActiveRentalOrder(date, rentalOrders?.rentalOrders || []);

		return (
			<PickersDay {...pickersDayProps} disabled={!!activeRentalOrder || date.isBefore(dayjs())} />
		);
	};

	return (
		<Container>
			<Typography variant={'h4'} mt={5} mb={4}>
				Rent a car
			</Typography>
			<Grid container spacing={5}>
				<Grid item xs={5}>
					<WSlider nextArrow={<ArrowNext />} prevArrow={<ArrowPrev />}>
						{car.images.map(image => (
							<Slide key={image.url}>
								<Image src={image.url} alt={image.filename} className={'img'} fill priority />
							</Slide>
						))}
					</WSlider>
					<Typography variant={'h5'} mt={7}>
						Busy Dates
					</Typography>
					<WCalendar
						onChange={(...params: any) => console.log('onChange', params)}
						value={new Date()}
						tileClassName={({ date }) =>
							getCalendarDateClassnames(date, rentalOrders?.rentalOrders || [], user)
						}
						activeStartDate={activeStartDate.toDate()}
						onActiveStartDateChange={view => setActiveStartDate(dayjs(view.activeStartDate))}
					/>
				</Grid>
				<Grid item xs={7}>
					<Typography variant={'h4'} mt={0}>
						{car.brand} {car.model}
					</Typography>
					<Typography variant={'h5'} mt={2} color={'primary'}>
						${car.price}/day
					</Typography>
					<Typography variant={'subtitle2'} color={'textSecondary'} mb={2}>
						Pledge: ${car.pledge}
					</Typography>
					<CarCharacteristics {...car} />
					<Typography mt={5} mb={5}>
						{car.description}
					</Typography>
					{role === 'Renter' && (
						<Button
							fullWidth
							variant={isRentMenuOpened ? 'outlined' : 'contained'}
							size={isRentMenuOpened ? 'small' : 'large'}
							onClick={() => setIsRentMenuOpened(isOpened => !isOpened)}
							disabled={isLoading}
						>
							{isRentMenuOpened ? 'Hide' : 'Rent A Car'}
						</Button>
					)}
					{isRentMenuOpened && (
						<Grid container mt={3} spacing={1}>
							<Grid item xs={6}>
								<DatePicker
									disablePast
									value={rentStartAt}
									onChange={date => setRentStartAt(dayjs(date))}
									renderInput={params => <TextField fullWidth {...params} />}
									renderDay={renderDatePickerDay}
									disabled={isLoading}
								/>
							</Grid>
							<Grid item xs={6}>
								<DatePicker
									disablePast
									value={rentEndAt}
									onChange={date => setRentEndAt(dayjs(date))}
									renderInput={params => <TextField fullWidth {...params} />}
									renderDay={renderDatePickerDay}
									disabled={isLoading}
								/>
							</Grid>
							<Grid item xs={12} container justifyContent={'flex-end'}>
								<Typography variant={'h5'} color={'primary'}>
									Total: {totalPrice}$
								</Typography>
							</Grid>
							<Grid item xs={12} mt={2}>
								<PayPalButtons
									disabled={!rentStartAt || !rentEndAt || isLoading}
									createOrder={createOrder}
									forceReRender={[createOrder]}
									onApprove={async (data, actions) => {
										const order = await actions.order?.capture();
										if (order) {
											rentCar({ orderId: order.id });
										}
									}}
								/>
							</Grid>
						</Grid>
					)}
				</Grid>
			</Grid>
		</Container>
	);
}
