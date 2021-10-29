import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { createDate, formatDate } from '../../plugins';
import { WeekPropTypes } from './WeekView.types';
import './WeekView.scss';

export const Week: React.FC<WeekPropTypes> = ({ currentTime }: WeekPropTypes) => {
	const [selectedWeek, setSelectedWeek] = useState(currentTime);
	useEffect(() => {
		setSelectedWeek(currentTime);
	}, [currentTime]);

	const renderSidebar = () => {
		return (
			<div className='sidebar'>
				<div className='title'>Hours</div>
				<div className='hours'>{renderHours(createDate(), true)}</div>
			</div>
		);
	};

	const renderDays = () => {
		const days = [];

		for (let i = 0; i <= 6; i++) {
			const date = selectedWeek.startOf('w').add(i, 'day');
			days.push(renderDay(date));
		}

		return days;
	};

	const renderDay = (day: Dayjs) => {
		return (
			<div key={`${day.get('month')}-${day.get('date')}`} className='date-item'>
				<div className={`date-name ${day.isSame(createDate(), 'date') ? 'today' : ''}`}>
					{formatDate(day, 'ddd')} {formatDate(day, 'D')}
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
		<div className='week-container'>
			{renderSidebar()}

			<div className='week-content'>
				<div className='days'>{renderDays()}</div>
			</div>
		</div>
	);
};
