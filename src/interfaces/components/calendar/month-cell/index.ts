import type { Dayjs } from 'dayjs';

export interface MonthDataProps {
    value: Dayjs,
    eventsStorage: Record<string, EventItem[]>
}

interface EventItem {
    content: string;
}