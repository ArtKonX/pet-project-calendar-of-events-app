import { MonthDataProps } from "@interfaces/components/calendar/month-cell";
import { formatMonth } from "./formatMonth";

export const getMonthData = ({ value, eventsStorage }: MonthDataProps) => {

    const targetMonth = formatMonth(value);

    const eventsForMonth = Object.entries(eventsStorage)
        .filter(([date]) => date.split('-')[1] === targetMonth)
        .flatMap(([, events]) => events.map(event => event.content));

    return eventsForMonth.slice(-3);
};