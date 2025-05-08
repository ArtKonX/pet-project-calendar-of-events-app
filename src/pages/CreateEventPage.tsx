import Layout from "@components/Layout/Layout"
import CreateOrEditEventForm from "@src/components/create-or-edit-event/CreateOrEditEventForm/CreateOrEditEventForm"
import HeadingWithContent from "@src/components/ui/HeadingWithContent/HeadingWithContent"
import { EventData } from '@interfaces/components/create-event';
import { addInEventsData, sortEventsData } from "@src/redux/slices/eventsSlice"
import { getId } from "@src/utils/getId"
import { FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { selectDateData, selectLangsData } from "@src/selectors/selectors";
import { useSelector } from "@src/hooks/useTypedSelector";
import { addNotification } from "@src/redux/slices/notificationSlice";
import dayjs from 'dayjs';
import headers from '@data/headers/headers.json';

import timePickerData from '@data/create-event/time-picker-data.json';
import eventPropsKeysData from '@data/create-event/event-props-keys-data.json';

const CreateEventPage = () => {

    const selectedDate = useSelector(selectDateData);

    const [eventData, setEventData] = useState<EventData>({
        id: null,
        eventText: '',
        eventStatus: '',
        eventFrom: '10:45',
        eventTo: '11:45',
        remindTime: '00:30',
        date: selectedDate.date,
        eventStartDate: dayjs('00:00')
    });

    const langsData = useSelector(selectLangsData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onCreateNewEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const hasEveryProps = eventPropsKeysData.every(prop =>
                eventData[prop] !== undefined
            );

            if (hasEveryProps) {

                const id = getId();

                const eventDataObj: EventData = {
                    ...eventData,
                    id,
                    eventStatus: 'success'
                };

                const timeToSubtract = eventData.remindTime;
                const [hours, minutes] = timeToSubtract.split(':').map(Number);
                const result = eventData['eventStartDate']
                    .subtract(hours, 'hours')
                    .subtract(minutes, 'minutes')
                    .format('YYYY-MM-DDTHH:mm:ss');

                const notificationObj = {
                    id,
                    title: eventData.eventText,
                    date: result,
                    notified: false
                }

                dispatch(addInEventsData({ eventData: eventDataObj }));
                dispatch(addNotification({ eventData: notificationObj }))
                dispatch(sortEventsData({date: eventDataObj.date}))

                navigate('/')
            } else {
                throw new Error('Не все обязательные поля заполнены');
            }

        } catch (error) {
            if (error instanceof Error) {
                console.error('Произошла ошибка:', error.message);
            } else {
                console.error('Неизвестная ошибка:', error);
            }
        }
    }

    const propsCreateEventForm = { eventData, setEventData, onCreateNewEvent, listDataTimePickerEvent: timePickerData[langsData.lang].data };

    return (
        <Layout>
            <HeadingWithContent titleHeading={`${headers[langsData.lang].headers.create}`}>
                <CreateOrEditEventForm {...propsCreateEventForm} />
            </HeadingWithContent>
        </Layout>
    )
}

export default CreateEventPage