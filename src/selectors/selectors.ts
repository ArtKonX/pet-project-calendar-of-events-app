import { RootState } from "@redux/store";
import { createSelector } from 'reselect';

export const selectEventsData = createSelector(
    (state: RootState) => state.eventsData,

    (eventsData) => ({
        ...eventsData,
        eventsData: eventsData.eventsData,
    })
);

export const selectDateData = createSelector(
    (state: RootState) => state.dateData,

    (dateData) => ({
        ...dateData,
        dateData: dateData.date,
    })
);


export const selectNotifications = createSelector(
    (state: RootState) => state.notifications,

    (notifications) => ({
        ...notifications,
        notifications: notifications.notifications,
    })
);




export const selectCurrentDateEvents = createSelector(
    (state: RootState) => state.currentDateEvents,

    (currentDateEvents) => ({
        ...currentDateEvents,
        currentDateEvents: currentDateEvents.currentDateEvents,
    })
);

export const selectEditEvents = createSelector(
    (state: RootState) => state.editEvents,

    (editEvents) => ({
        ...editEvents,
        editEvents: editEvents.currentEditEvent,
    })
);

export const selectLangsData = createSelector(
    (state: RootState) => state.langsData,

    (langsData) => ({
        ...langsData,
        langsData: langsData.lang,
    })
);