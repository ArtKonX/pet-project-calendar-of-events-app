import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import { MonthCell, DateCell } from '@components/calendar';
import { Dayjs } from 'dayjs';
import { CalendarBodyProps } from '@interfaces/components/calendar';

const CalendarBody = ({ eventsData, onSelect }: CalendarBodyProps) => {

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return <DateCell value={current} eventsStorage={eventsData} />;
        if (info.type === 'month') return <MonthCell value={current} eventsStorage={eventsData} />;
        return info.originNode;
    };

    return (
        
        <Calendar

            cellRender={cellRender}
            onSelect={onSelect}
        />
    )
}

export default CalendarBody