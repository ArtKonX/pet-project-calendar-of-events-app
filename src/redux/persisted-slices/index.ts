import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import EventsSlice from "@redux/slices/eventsSlice";
import DateSlice from '@redux/slices/dateSlice';
import NotificationSlice from '@redux/slices/notificationSlice';
import LangsSlice from '@redux/slices/langsSlice';

const persistEventsDataConfig = {
    key: 'eventsData',
    storage,
};

const persistDateDataConfig = {
    key: 'dateData',
    storage,
};

const persistNotificationsConfig = {
    key: 'notifications',
    storage,
};

const persistLangsDataConfig = {
    key: 'langsData',
    storage,
};

export const persistedEventSliceReducer =
    persistReducer(persistEventsDataConfig, EventsSlice);

export const persistedDateSliceReducer =
    persistReducer(persistDateDataConfig, DateSlice);

export const persistedNotificationsSliceReducer =
    persistReducer(persistNotificationsConfig, NotificationSlice);

export const persistedLangsSliceReducer =
    persistReducer(persistLangsDataConfig, LangsSlice);
