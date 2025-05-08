import { configureStore } from "@reduxjs/toolkit";
import CurrentDateSlice from '@redux/slices/currentDateSlice';
import EditSlice from '@redux/slices/editSlice';
import { persistStore } from 'redux-persist';
import { persistedDateSliceReducer, persistedEventSliceReducer, persistedLangsSliceReducer, persistedNotificationsSliceReducer } from "../persisted-slices";

export const store = configureStore({
    reducer: {
        notifications: persistedNotificationsSliceReducer,
        dateData: persistedDateSliceReducer,
        eventsData: persistedEventSliceReducer,
        langsData: persistedLangsSliceReducer,
        currentDateEvents: CurrentDateSlice,
        editEvents: EditSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(
            {
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST'],
                    ignoredPaths: ['persist.register']
                }
            }
        )
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;