import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { createDate, formatDate } from '../../plugins';
import { DayPropTypes } from './DayView.types';
import './DayView.scss';

export const Day: React.FC<DayPropTypes> = ({ currentTime }: DayPropTypes) => {
	const [selectedDate, setSelectedDate] = useState(currentTime);
	useEffect(() => {
		setSelectedDate(currentTime);
	}, [currentTime]);

	const renderSidebar = () => {
		return (
			<div className='sidebar'>
				<div className='title'>Hours</div>
				<div className='hours'>{renderHours(createDate(), true)}</div>
			</div>
		);
	};

	const renderDay = (day: Dayjs) => {
		return (
			<div key={`${day.get('month')}-${day.get('date')}`} className='date-item'>
				<div className={`date-name ${day.isSame(createDate(), 'date') ? 'today' : ''}`}>
					{formatDate(day, 'ddd')} <span>{formatDate(day, 'D')}</span>
				</div>
				<div className='hours'>{renderHours(day, false)}</div>
			</div>
		);
	};

	const renderHours = (day: Dayjs, isSidebar: boolean) => {
		const totalHours = isSidebar ? 25 : 24;
		const hourList = [];

		for (let i = 0; i < totalHours; i++) {
			const hour = day.startOf('date').add(i, 'h');
			hourList.push(
				<div key={i} className={`hour ${isSidebar ? 'for-sidebar' : ''}`} onClick={() => console.log(hour)}>
					{isSidebar && formatDate(hour, 'hh A')}
				</div>
			);
		}

		return hourList;
	};

	return (
		<div className='day-container'>
			{renderSidebar()}

			<div className='day-content'>
				<div className='days'>{renderDay(selectedDate.startOf('d'))}</div>
			</div>
		</div>
	);
};
