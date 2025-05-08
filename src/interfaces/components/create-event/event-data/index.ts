import { Dayjs } from 'dayjs';

export interface EventData {
    id: string,
    date: string,
    eventText: string,
    eventStatus: string,
    eventFrom: string,
    eventTo: string,
    remindTime: string,
    eventStartDate: Dayjs
}