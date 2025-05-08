import type { Dayjs } from 'dayjs';

export const formatMonth = (value: Dayjs) => {
    const monthNumber = value.month() + 1;
    return monthNumber < 10 ? `0${monthNumber}` : String(monthNumber);
};