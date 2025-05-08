import { showNotification } from '@src/functions/showNotification';
import { useSelector } from '@src/hooks/useTypedSelector';
import { removeNotification } from '@src/redux/slices/notificationSlice';
import { selectLangsData, selectNotifications } from '@src/selectors/selectors';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NotificationHandlerMessage from '../NotificationHandlerMessage/NotificationHandlerMessage';

const NotificationHandler = () => {
    const notifications = useSelector(selectNotifications);
    const langsData = useSelector(selectLangsData);
    const dispatch = useDispatch();
    const [message, setMessage] = useState<string>('');

    const handleNotifications = () => {
        const now = new Date();
        const events = notifications.notifications;

        if (events.length === 0) return;

        events.forEach(event => {
            const eventDate = new Date(event.date);
            const twoMinutesBefore = new Date(eventDate.getTime() - (2 * 60000));

            if (event && !event.notified) {
                if (now >= twoMinutesBefore && now <= eventDate) {
                    dispatch(removeNotification({ id: event.id }));
                    showNotification(event, langsData.lang);
                    setMessage(event.title)
                }
            }
        });
    };

    useEffect(() => {
        handleNotifications();
        const interval = setInterval(handleNotifications, 30 * 1000);
        return () => clearInterval(interval);
    }, [notifications.notificationsIds.length,]);

    return (
        message &&
        <div className='fixed w-full self-center mx-auto left-10 z-10000'>
            <NotificationHandlerMessage notificationsType={{ type: 'message', text: message }} />
        </div>
    );
};

export default NotificationHandler;