import { MonthDataProps } from '@interfaces/components/calendar/month-cell';
import { getMonthData } from '@src/utils/month-data/getMonthData';
import MonthEventsList from './MonthEventsList/MonthEventsList';

export const MonthCell = ({ value, eventsStorage }: MonthDataProps) => {

    const events = getMonthData({ value, eventsStorage });

    return events.length > 0 ? (
        <div>
            <MonthEventsList events={events} title='Последние задачи месяца:'  />
        </div>
    ) : null;
}