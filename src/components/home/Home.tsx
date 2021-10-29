import React, { useState } from 'react';
import { createDate, formatDate } from '../../plugins';
import { Month } from '../monthView';
import { Week } from '../weekView';
import { Day } from '../dayView';
import './Home.scss';

export const Home: React.FC = () => {
	const [currentTime, setCurrentTime] = useState(createDate());
	const [type, setType] = useState('month');

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleTypeChange = (e: any) => {
		setType(e.target.value);
	};

	const handlePrevClick = () => {
		setCurrentTime(currentTime.subtract(1, type));
	};
	const handleNextClick = () => {
		setCurrentTime(currentTime.add(1, type));
	};

	return (
		<div className='home-container'>
			<div className='header'>
				<div>{formatDate(currentTime, 'MMMM YYYY')}</div>
				<div className='controllers'>
					<button onClick={handlePrevClick}>Prev</button>
					<select onChange={handleTypeChange} value={type}>
						<option value='month'>Month</option>
						<option value='week'>Week</option>
						<option value='day'>Day</option>
					</select>
					<button onClick={handleNextClick}>Next</button>
				</div>
				<button onClick={() => setCurrentTime(createDate())}>Today</button>
			</div>
			<div className='main-content'>
				{type === 'month' && <Month currentTime={currentTime} />}
				{type === 'week' && <Week currentTime={currentTime} />}
				{type === 'day' && <Day currentTime={currentTime} />}
			</div>
		</div>
	);
};
