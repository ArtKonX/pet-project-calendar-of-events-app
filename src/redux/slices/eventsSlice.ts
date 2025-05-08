import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { AddInEventsDataPayloadAction, EventsSliceInitialState, RemoveInEventsDataPayloadAction } from "@src/interfaces/redux/slices";
import { EventData } from "@interfaces/components/create-event";

const initialState = {
    eventsData: {}
} as EventsSliceInitialState;

interface ChangeTypesEventsPayloadAction {
    date: string
}

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

interface UpdateCurrentEditEventPayloadAction {
    eventData: EventData
}

interface SortEventsDataPayloadAction {
    date: string
}

const EventsSlice = createSliceWithThunk({
    name: "eventsData",
    initialState,
    selectors: {
        eventsData: (state) => state,
    },
    reducers: (create) => ({
        sortEventsData: create.reducer((state, action: PayloadAction<SortEventsDataPayloadAction>) => {
            const { date } = action.payload;

            state.eventsData[date] = state.eventsData[date].sort((a, b) => {
                const [hoursA, minutesA] = a.from.split(':').map(Number);
                const [hoursB, minutesB] = b.from.split(':').map(Number);

                if (hoursA === hoursB) {
                    return minutesA - minutesB;
                }
                return hoursA - hoursB;
            });

            console.log(state.eventsData[date])
        }),
        updateCurrentEditEvent: create.reducer((state, action: PayloadAction<UpdateCurrentEditEventPayloadAction>) => {

            const { date, id, eventStatus, eventText, eventFrom, eventTo, remindTime } = action.payload.eventData;

            const eventObj = {
                id,
                type: eventStatus,
                content: eventText,
                from: eventFrom,
                to: eventTo,
                remindTime,
                date
            };

            const currentIndxEvent = state.eventsData[date].findIndex(event => event.id === id);

            if (currentIndxEvent !== -1) {
                state.eventsData[date][currentIndxEvent] = eventObj
            } else {
                console.error(`Элемент с id: ${id} не найден!`)
            }
        }),
        changeTypesEvents: create.reducer((state, action: PayloadAction<ChangeTypesEventsPayloadAction>) => {
            const { date } = action.payload;

            const eventsArray = state.eventsData[date];

            if (eventsArray.length > 0) {
                eventsArray.forEach((_, indx) => {
                    console.log(state.eventsData[date][indx].type)

                    state.eventsData[date][indx].type = 'error'

                })
            }
        }),
        addInEventsData: create.reducer((state, action: PayloadAction<AddInEventsDataPayloadAction>) => {

            const { date, id, eventStatus, eventText, eventFrom, eventTo, remindTime } = action.payload.eventData;

            const hasDate = Object.prototype.hasOwnProperty.call(state.eventsData, date);

            const eventObj = {
                id,
                type: eventStatus,
                content: eventText,
                from: eventFrom,
                to: eventTo,
                remindTime,
                date
            };

            if (!hasDate) {
                state.eventsData = {
                    [date]: [
                        eventObj
                    ],
                    ...state.eventsData
                }
            } else {
                state.eventsData[date].push(eventObj)
            }
        }),
        removeInEventsData: create.reducer((state, action: PayloadAction<RemoveInEventsDataPayloadAction>) => {
            const { id, date } = action.payload;

            state.eventsData[date] = state.eventsData[date].filter(event => event.id !== id);
        }),
        resetEventsData: create.reducer((state) => {
            state.eventsData = null;
        })
    }),
});

export default EventsSlice.reducer;

const persistConfig = {
    key: 'eventsData',
    storage,
    whitelist: ['eventsData'],
};

const persistedReducer = persistReducer(persistConfig, EventsSlice.reducer);

export const { sortEventsData, changeTypesEvents, updateCurrentEditEvent, addInEventsData, removeInEventsData, resetEventsData } = EventsSlice.actions;
export const reducer = persistedReducer;