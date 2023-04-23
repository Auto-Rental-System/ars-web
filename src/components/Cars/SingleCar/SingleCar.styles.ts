import styled from 'styled-components';
import Slider from 'react-slick';
import Calendar from 'react-calendar';
import IconButton from '@mui/material/IconButton';

export const Slide = styled.div`
	width: 100%;
	overflow: hidden;
	position: relative;
	aspect-ratio: 16 / 9;
	border-radius: 0.5rem;

	.img {
		object-fit: cover;
	}
`;

export const WSlider = styled(Slider).attrs({
	dots: true,
	arrows: true,
	infinite: true,
	speed: 1000,
	slidesToShow: 1,
	slidesToScroll: 1,
})`
	border-radius: 0.5rem;
`;

export const CarouselNavigationButton = styled(IconButton)`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	background: rgba(255, 255, 255, 0.3);
	z-index: 2;

	&:hover {
		background: rgba(255, 255, 255, 0.5);
	}
`;

export const NextButton = styled(CarouselNavigationButton)`
	right: 0.5rem;
`;

export const PrevButton = styled(CarouselNavigationButton)`
	left: 0.5rem;
`;

export const WCalendar = styled(Calendar).attrs({
	className: 'calendar',
})`
	&.calendar {
		margin-top: 1rem;
		width: 100%;
		border-radius: 0.5rem;
		border: 2px solid ${({ theme }) => theme.palette.primary.main};
	}

	.react-calendar__month-view__days {
		button {
			border-radius: 10rem;
			background: ${({ theme }) => theme.palette.primary.contrastText};
		}

		button: hover {
			cursor: auto !important;
			background: ${({ theme }) => theme.palette.primary.contrastText};
			color: inherit;
		}

		button.react-calendar__month-view__days__day--neighboringMonth {
			color: ${({ theme }) => theme.colors.strokes};
		}

		button.react-calendar__month-view__days__day--weekend {
			color: ${({ theme }) => theme.palette.secondary.main};
		}

		button.active:not(.first-day, .last-day) {
			border-radius: 0;
		}

		button.react-calendar__tile--now {
			background: ${({ theme }) => theme.palette.primary.main};
		}

		button.active {
			background: ${({ theme }) => theme.colors.lightSecondary};
			color: ${({ theme }) => theme.palette.primary.main};
		}

		button.active.rented-by-me {
			background: ${({ theme }) => theme.colors.lightPrimary};
		}

		button.active.first-day {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		button.active.last-day {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
`;
