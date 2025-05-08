import type { Dayjs } from 'dayjs';
import DateCellList from './DateCellList/DateCellList';
import { getListData } from '@src/utils/getListData';
import { EventObj } from '@interfaces/redux/slices';

interface DateCellProps {
    value: Dayjs,
    eventsStorage: EventObj
}

export const DateCell = ({ ...props }: DateCellProps) => {

    const { value, eventsStorage } = props;

    const listData = getListData(value, eventsStorage);

    return (
        <div>
            <DateCellList listData={listData} />
        </div>
    );
};