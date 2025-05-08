import React, { FormEvent, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import HeadingWithContent from '@src/components/ui/HeadingWithContent/HeadingWithContent';
import Layout from '@src/components/Layout/Layout';
import { useDispatch } from 'react-redux';
import { addDate, removeDate } from '@src/redux/slices/dateSlice';
import { useSelector } from '@src/hooks/useTypedSelector';
import { selectEventsData, selectLangsData, selectNotifications } from '@src/selectors/selectors';

import { addCountNotAllow, addIsAllow, addIsNotAllow, cancelIsNotAllow, checkNotAllow, removeCountNotAllow } from '@src/redux/slices/notificationSlice';
import CalendarBody from '@src/components/calendar/CalendarBody/CalendarBody';
import NotificationPrompt from '@src/components/calendar/NotificationPrompt/NotificationPrompt';
import { getListData } from '@src/utils/getListData';
import NotificationHandlerMessage from '@src/components/notification/NotificationHandlerMessage/NotificationHandlerMessage';

import headers from '@data/headers/headers.json';

const CalendarPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const eventsStorage = useSelector(selectEventsData);
    const notifications = useSelector(selectNotifications);
    const langsData = useSelector(selectLangsData);

    const requestNotificationPermission = () => {
        try {
            const permission = Notification.permission;

            if (permission === 'granted') {
                dispatch(removeCountNotAllow());
                dispatch(cancelIsNotAllow());
                console.log('Уведомления разрешены');
            } else {
                dispatch(addIsNotAllow());
                dispatch(checkNotAllow());
                console.error('Ошибка при запросе разрешения');
            }
        } catch (err) {
            console.error('Ошибка при запросе разрешения', err);
        }
    };

    useEffect(() => {
        dispatch(removeDate());
        requestNotificationPermission();
    }, []);

    const onNavigateToEventAction = (value: Dayjs, type?: { source: string }): void => {
        if (type.source === 'month') return;
        if (type.source === 'year') return;

        const now = dayjs().subtract(1, 'day');
        const selectedDate = value

        const hasEvents = getListData(value, eventsStorage.eventsData).length > 0;
        const date = value.format('YYYY-MM-DD');

        if (now.isAfter(selectedDate)) {
            console.log(now, selectedDate)
            return;
        }

        if (hasEvents) {
            navigate(`/event/${getListData(value, eventsStorage.eventsData)[0].id}`, {
                state: { selectedDate: date }
            });
        } else {
            dispatch(addDate({ date }))
            navigate('/create-event');
        }
    }

    const onAllow = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(addIsAllow());
    }

    const onNotAllow = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(addCountNotAllow())
        dispatch(checkNotAllow());
    }

    return (
        <Layout>
            <HeadingWithContent titleHeading={`${headers[langsData.lang]?.headers.main}`}>
                <NotificationHandlerMessage notificationsType={{ type: 'notification' }} />
                <CalendarBody
                    eventsData={eventsStorage.eventsData}
                    onSelect={onNavigateToEventAction}
                />
                <NotificationPrompt
                    isAllowed={notifications.isAllow}
                    onAllow={onAllow}
                    isWarning={false}
                />
                <NotificationPrompt
                    isAllowed={notifications.isNotAllow}
                    onAllow={onNotAllow}
                    isWarning={true}
                />
            </HeadingWithContent>
        </Layout>
    );
}

export default CalendarPage;