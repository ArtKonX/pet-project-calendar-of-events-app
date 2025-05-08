interface ShowNotificationEvent {
    title: string
}

export const showNotification = async (event: ShowNotificationEvent, lang: string) => {
    try {
        if (!('Notification' in window)) {
            console.error('Уведомления не поддерживаются браузером');
            return;
        }

        if (Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                console.error('Пользователь не разрешил уведомления');
                return;
            }
        }

        const iconPath = process.env.NODE_ENV === 'development'
            ? '/calendar-of-events/vite.svg'
            : '/assets/vite.svg';

        new Notification(event.title, {
            body: `${lang === 'ru' ? 'Напоминаю о событии:' : 'I remind you about the event:'} "${event.title}"`,
            icon: iconPath
        });
    } catch (error) {
        console.error('Ошибка при создании уведомления:', error);
    }
};