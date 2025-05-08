import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { AddNotificationPayloadAction, ChangeNotificationPayloadAction, NotificationsSliceInitialState, RemoveNotificationPayloadAction } from "@interfaces/redux/slices";

const initialState = {
    notifications: [],
    notificationsIds: [],
    isAllow: false,
    isNotAllow: false,
    countNotAllow: 0,
} as NotificationsSliceInitialState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const NotificationSlice = createSliceWithThunk({
    name: "notifications",
    initialState,
    selectors: {
        notifications: (state) => state,
    },
    reducers: (create) => ({
        addNotification: create.reducer((state, action: PayloadAction<AddNotificationPayloadAction>) => {
            const { eventData } = action.payload;

            const findIndx = state.notifications.findIndex(notification => notification.id === eventData.id);

            if (findIndx !== -1) {
                state.notifications[findIndx] = eventData
            } else {
                state.notifications.push(eventData);
            }

            state.notificationsIds.push(eventData.id)
        }),
        removeNotification: create.reducer((state, action: PayloadAction<RemoveNotificationPayloadAction>) => {

            const { id } = action.payload;

            const findIndex = state.notifications.findIndex((notification) => notification.id === id);

            if (findIndex !== -1) {
                state.notifications[findIndex].notified = true;
            }

            state.notificationsIds = state.notificationsIds.filter(idItem => idItem !== id);
            state.notifications = state.notifications.filter((notification) => notification.id !== id);
        }),
        changeNotification: create.reducer((state, action: PayloadAction<ChangeNotificationPayloadAction>) => {
            const { eventData } = action.payload;

            const findIndx = state.notifications.findIndex(notification => notification.id === eventData.id);

            if (findIndx !== -1) {
                state.notifications[findIndx] = eventData;
                state.notificationsIds.push(eventData.id)
            }
        }),
        addIsAllow: create.reducer((state) => {
            state.isAllow = true;
        }),
        addIsNotAllow: create.reducer((state) => {
            state.isNotAllow = false;
        }),
        cancelIsNotAllow: create.reducer((state) => {
            state.isNotAllow = true;
        }),
        addCountNotAllow: create.reducer((state) => {
            if (state.countNotAllow < 2) {
                state.countNotAllow++;
            }
        }),
        removeCountNotAllow: create.reducer((state) => {
            state.countNotAllow = 0;
        }),
        checkNotAllow: create.reducer((state) => {
            if (state.countNotAllow >= 1) {
                state.isNotAllow = true
            } else {
                state.isNotAllow = false
            }
        }),
    }),
});

export default NotificationSlice.reducer;

const persistConfig = {
    key: 'notifications',
    storage,
    whitelist: ['notifications'],
};

const persistedReducer = persistReducer(persistConfig, NotificationSlice.reducer);

export const { addCountNotAllow, removeCountNotAllow, checkNotAllow, addIsNotAllow, cancelIsNotAllow, addNotification, removeNotification, changeNotification, addIsAllow } = NotificationSlice.actions;
export const reducer = persistedReducer;