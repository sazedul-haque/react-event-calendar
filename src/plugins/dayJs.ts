import dayJs from 'dayjs';

export const createDate = (date?: string | number | Date | dayJs.Dayjs): dayJs.Dayjs => {
	return dayJs(date ? date : dayJs());
};

export const formatDate = (date?: string | number | Date | dayJs.Dayjs, formatString?: string): string => {
	return dayJs(date ? date : dayJs()).format(formatString);
};
