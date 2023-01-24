import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import SortIcon from 'assets/icons/sort.svg';
import { CarOrderBy } from 'clients/CoreService';
import { AddButton, Header, OrderButton, OrderByAutocomplete } from './ListHeader.styles';
import { ListHeaderProps } from '.';

export default function ListHeader({
	order,
	setOrder,
	orderBy,
	setOrderBy,
	orderByOptions,
	getOrderByLabel,
	orderDisabled,
	onAdd,
	addText,
}: ListHeaderProps) {
	return (
		<Header>
			<OrderByAutocomplete
				renderInput={params => <TextField {...params} label={'Ordering'} />}
				size={'small'}
				options={orderByOptions}
				disableClearable
				value={orderBy}
				getOptionLabel={getOrderByLabel as any}
				onChange={(_, newOrderBy) => setOrderBy(newOrderBy as CarOrderBy)}
			/>
			<OrderButton
				onClick={() => setOrder(order === 'ASC' ? 'DESC' : 'ASC')}
				disabled={orderDisabled}
			>
				<Image src={SortIcon} alt={'Sort'} className={'sort-icon'} />
				<Typography variant={'body1'} color={'primary'}>
					{order}
				</Typography>
			</OrderButton>
			{onAdd && (
				<AddButton onClick={onAdd} variant={'contained'}>
					<AddIcon />
					<Typography>{addText || 'Add'}</Typography>
				</AddButton>
			)}
		</Header>
	);
}
