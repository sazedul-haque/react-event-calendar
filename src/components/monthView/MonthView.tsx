import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { createDate, formatDate } from '../../plugins';
import { MonthPropTypes } from './MonthView.types';
import './MonthView.scss';

export const Month: React.FC<MonthPropTypes> = ({ currentTime }: MonthPropTypes) => {
	const [selectedMonth, setSelectedMonth] = useState(currentTime);
	useEffect(() => {
		setSelectedMonth(currentTime);
	}, [currentTime]);

	const renderDateNames = () => {
		const names = [];

		for (let i = 0; i <= 6; i++) {
			const date = selectedMonth.startOf('w').add(i, 'day');
			names.push(
				<div key={i} className='name'>
					{formatDate(date, 'ddd')}
				</div>
			);
		}

		return names;
	};

	const renderDays = () => {
		const days = [];
		const dayOfFirstDate = selectedMonth.startOf('M').get('d');
		const dayOfLastDate = selectedMonth.endOf('M').get('d');

		for (let i = dayOfFirstDate; i > 0; i--) {
			const date = selectedMonth.startOf('M').subtract(i, 'day');
			days.push(renderDay(date));
		}

		for (let i = 0; i < selectedMonth.daysInMonth(); i++) {
			const date = selectedMonth.startOf('M').add(i, 'day');
			days.push(renderDay(date));
		}

		for (let i = 1; i <= 6 - dayOfLastDate; i++) {
			const date = selectedMonth.endOf('M').add(i, 'day');
			days.push(renderDay(date));
		}

		return days;
	};

	const renderDay = (day: Dayjs) => {
		return (
			<div
				key={`${day.get('month')}-${day.get('date')}`}
				className={`date-item ${day.isSame(createDate(), 'date') ? 'today' : ''} ${
					day.isSame(selectedMonth, 'month') ? 'current-month' : ''
				}`}
				onClick={() => console.log(day)}
			>
				<span>{formatDate(day, 'D')}</span>
			</div>
		);
	};

	return (
		<div className='container'>
			<div className='date-names'>{renderDateNames()}</div>
			<div className='date-list'>{renderDays()}</div>
		</div>
	);
};
