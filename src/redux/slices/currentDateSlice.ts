import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";
import { CurrentDateSliceInitialState } from "@src/interfaces/redux/slices";
import { FindCurrentEventsDatePayloadAction, RemoveInEventsDataPayloadAction } from '@interfaces/redux/slices/current-date-slice'

const initialState = {
    currentDateEvents: {},
} as CurrentDateSliceInitialState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const CurrentDateSlice = createSliceWithThunk({
    name: "currentDateEvents",
    initialState,
    selectors: {
        currentDateEvents: (state) => state,
    },
    reducers: (create) => ({
        findCurrentEventsDate: create.reducer((state, action: PayloadAction<FindCurrentEventsDatePayloadAction>) => {

            const { id, eventsData } = action.payload;

            const findEventsDate = Object.entries(eventsData).find(event => (event[1][0]?.id === id))

            if (findEventsDate) {
                state.currentDateEvents = {
                    date: findEventsDate[0],
                    events: findEventsDate[1]
                }
            }
        }),
        removeInCurrentDateEvents: create.reducer((state, action: PayloadAction<RemoveInEventsDataPayloadAction>) => {
            const { id } = action.payload;

            state.currentDateEvents.events = state.currentDateEvents.events.filter(event => event.id !== id)
        })
    }),
});

export const { findCurrentEventsDate, removeInCurrentDateEvents } = CurrentDateSlice.actions;
export default CurrentDateSlice.reducer;