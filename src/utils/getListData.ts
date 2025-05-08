import { EventObj } from '@interfaces/redux/slices';
import { Dayjs } from 'dayjs'

interface Event {
    id: string;
    type: string;
    content: string;
}

export const getListData = (value: Dayjs, eventsStorage: EventObj): Event[] => {
    const dateString = value.format('YYYY-MM-DD');
    return eventsStorage[dateString] || [];
};