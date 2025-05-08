import { Dayjs } from 'dayjs';
import { SelectInfo } from 'antd/es/calendar/generateCalendar';
import { EventObj } from '@interfaces/redux/slices';

export interface CalendarBodyProps {
    eventsData: EventObj,
    onSelect: (date: Dayjs, selectInfo: SelectInfo) => void
}