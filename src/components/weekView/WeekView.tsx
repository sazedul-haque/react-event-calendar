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

	const renderDateNames = () => {
		const names = [];

		names.push(
			<div key={7} className='name sidebar'>
				Hours
			</div>
		);

		for (let i = 0; i <= 6; i++) {
			const date = selectedWeek.startOf('w').add(i, 'day');
			names.push(
				<div key={i} className={`name ${date.isSame(createDate(), 'date') ? 'today' : ''}`}>
					{formatDate(date, 'ddd')} <span>{formatDate(date, 'D')}</span>
				</div>
			);
		}

		return names;
	};

	const renderDateList = () => {
		const days = [];

		days.push(renderDay(7, createDate(), true)); // For Sidebar

		for (let i = 0; i <= 6; i++) {
			const date = selectedWeek.startOf('w').add(i, 'day');
			days.push(renderDay(i, date, false));
		}

		return days;
	};

	const renderDay = (idx: number, day: Dayjs, isSidebar: boolean) => {
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
		<div className='week-container'>
			<div className='date-names'>{renderDateNames()}</div>
			<div className='date-list'>{renderDateList()}</div>
		</div>
	);
};
