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

	const renderDateNames = () => {
		return (
			<>
				<div className='name sidebar'>
					<div className='name-inner'>Hours</div>
				</div>
				<div className={`name ${selectedDate.isSame(createDate(), 'date') ? 'today' : ''}`}>
					<div className='name-inner'>
						{formatDate(selectedDate, 'ddd')} <span>{formatDate(selectedDate, 'D')}</span>
					</div>
				</div>
			</>
		);
	};

	const renderDateList = () => {
		const days = [];

		days.push(renderDate(1, selectedDate.startOf('d'), true)); // For Sidebar
		days.push(renderDate(2, selectedDate.startOf('d'), false));

		return days;
	};

	const renderDate = (idx: number, day: Dayjs, isSidebar: boolean) => {
		return (
			<div key={idx} className={`date-item ${isSidebar ? 'sidebar' : ''}`}>
				{renderHours(day, isSidebar)}
			</div>
		);
	};

	const renderHours = (day: Dayjs, isSidebar: boolean) => {
		const totalHours = isSidebar ? 25 : 24;
		const hourList = [];

		for (let i = 0; i < totalHours; i++) {
			const hour = day.startOf('date').add(i, 'h');
			hourList.push(renderHour(i, hour, isSidebar));
		}

		return hourList;
	};

	const renderHour = (idx: number, hour: Dayjs, isSidebar: boolean) => {
		return (
			<div key={idx} className={`hour ${isSidebar ? 'sidebar' : ''}`} onClick={() => console.log(hour)}>
				<div className='hour-content'>{isSidebar && formatDate(hour, 'hh A')}</div>
			</div>
		);
	};

	return (
		<div className='day-container'>
			<div className='date-names'>{renderDateNames()}</div>
			<div className='date-list'>{renderDateList()}</div>
		</div>
	);
};
