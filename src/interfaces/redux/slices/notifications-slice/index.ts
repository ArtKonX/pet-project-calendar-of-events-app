export interface NotificationsSliceInitialState {
    notifications: Notification[],
    notificationsIds: string[],
    isAllow: boolean;
    isNotAllow: boolean,
    countNotAllow: number
}

export interface AddNotificationPayloadAction {
    eventData: Notification
}

export interface ChangeNotificationPayloadAction {
    eventData: Notification
}

export interface RemoveNotificationPayloadAction {
    id: string
}

interface Notification {
    id: string,
    title: string,
    date: string,
    notified: boolean
}