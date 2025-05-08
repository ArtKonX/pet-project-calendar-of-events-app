import { EventData } from "@interfaces/components/create-event";
import CreateOrEditEventForm from "@src/components/create-or-edit-event/CreateOrEditEventForm/CreateOrEditEventForm"
import Layout from "@src/components/Layout/Layout";
import HeadingWithContent from "@src/components/ui/HeadingWithContent/HeadingWithContent"
import { sortEventsData, updateCurrentEditEvent } from "@src/redux/slices/eventsSlice";
import { addNotification, changeNotification } from "@src/redux/slices/notificationSlice";
import { selectCurrentDateEvents, selectEditEvents, selectLangsData } from "@src/selectors/selectors";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { findCurrentEditEvent } from '@src/redux/slices/editSlice';

import timePickerData from '@data/create-event/time-picker-data.json';
import eventPropsKeysData from '@data/create-event/event-props-keys-data.json';

import headers from '@data/headers/headers.json';

const EditPage = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const events = useSelector(selectCurrentDateEvents);
    const currentEditEvents = useSelector(selectEditEvents);

    const langsData = useSelector(selectLangsData);

    const { content, from, to, remindTime, date, type, eventStartDate } = currentEditEvents.currentEditEvent;

    const navigate = useNavigate();

    const [eventData, setEventData] = useState<EventData>({
        id: id,
        eventText: content,
        eventStatus: type,
        eventFrom: from,
        eventTo: to,
        remindTime: remindTime,
        date: date,
        eventStartDate: eventStartDate
    });

    useEffect(() => {
        setEventData({
            id: id,
            eventText: content,
            eventStatus: type,
            eventFrom: from,
            eventTo: to,
            remindTime: remindTime,
            date: date,
            eventStartDate: eventStartDate
        })
    }, [content, from, to, remindTime, date, type, eventStartDate])

    useEffect(() => {

        dispatch(findCurrentEditEvent({ id, currentDateEvents: events.currentDateEvents }))
    }, []);

    const onCreateNewEvent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const hasEveryProps = eventPropsKeysData.every(prop =>
                eventData[prop] !== undefined
            );

            if (hasEveryProps) {

                const eventDataObj: EventData = {
                    ...eventData
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

                dispatch(addNotification({ eventData: notificationObj }));
                dispatch(changeNotification({ eventData: notificationObj }));

                dispatch(updateCurrentEditEvent({ eventData: eventDataObj }));
                dispatch(sortEventsData({ date: eventDataObj.date }))

                navigate('/')
            } else {
                throw new Error('Произошла ошибка обновления события(');
            }

        } catch (error) {
            if (error instanceof Error) {
                console.error('Произошла ошибка:', error.message);
            } else {
                console.error('Неизвестная ошибка:', error);
            }
        }
    }

    const propsEditEventForm = { eventData, setEventData, onCreateNewEvent, listDataTimePickerEvent: timePickerData[langsData.lang].data };

    return (
        <Layout>
            <HeadingWithContent titleHeading={`${headers[langsData.lang].headers.edit}${langsData.lang === 'ru' ?
                date?.split('-')?.reverse()?.join('-') :
                date} :`}>
                <CreateOrEditEventForm {...propsEditEventForm} />
            </HeadingWithContent>
        </Layout>
    )
}

export default EditPage