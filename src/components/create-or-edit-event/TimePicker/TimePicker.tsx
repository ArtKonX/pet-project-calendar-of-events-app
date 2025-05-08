import './TimePicker.scss';

import { TimePickerEventProps } from '@src/interfaces/components/create-event';
import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const TimePickerEvent = ({ ...props }: TimePickerEventProps) => {

    const { name, eventData, setEventData } = props;

    const currentDate = dayjs();
    const today = dayjs().startOf('day');

    const isToday = dayjs(eventData.date).isSame(today, 'day');

    const onChangeEvent: TimePickerProps['onChange'] = (time, timeString) => {

        const date = dayjs(dayjs(time).format('YYYY-MM-DDTHH:mm:ss'))

        setEventData({ ...eventData, [name]: timeString, eventStartDate: name === 'eventFrom' ? date : eventData['eventStartDate'] })
    };

    const minTime = isToday ? currentDate : null;

    return (
        <TimePicker required
        value={dayjs(eventData[name], 'HH:mm')}
        name={name}
        onChange={onChangeEvent}
        defaultValue={dayjs(eventData[name], 'HH:mm')}
        defaultOpenValue={dayjs(eventData[name], 'HH:mm')}
        format='HH:mm'
        disabledHours={() => {
            if (name === 'remindTime') return []
            if (!minTime) return [];
            return Array.from({ length: minTime.hour() }, (_, i) => i);
        }}
        disabledMinutes={(selectedHour) => {
            if (!minTime || selectedHour !== minTime.hour()) return [];
            return Array.from({ length: minTime.minute() }, (_, i) => i);
        }} />
    )
}

export default TimePickerEvent