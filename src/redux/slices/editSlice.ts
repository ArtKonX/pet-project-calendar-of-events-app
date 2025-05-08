import { EditSliceInitialState, FindCurrentEditEventPayloadAction } from "@interfaces/redux/slices";
import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    currentEditEvent: {},
} as EditSliceInitialState

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const EditSlice = createSliceWithThunk({
    name: "editEvents",
    initialState,
    selectors: {
        editEvents: (state) => state,
    },
    reducers: (create) => ({
        findCurrentEditEvent: create.reducer((state, action: PayloadAction<FindCurrentEditEventPayloadAction>) => {

            const { id, currentDateEvents } = action.payload;

            if (currentDateEvents.events) {
                const findDateEvents = currentDateEvents.events.find(event => event.id === id);

                if (findDateEvents) {
                    state.currentEditEvent = findDateEvents;
                }
            }
        }),
        removeCurrentEditEvent: create.reducer((state) => {

            state.currentEditEvent = null
        }),
    }),
});

export const { findCurrentEditEvent, removeCurrentEditEvent } = EditSlice.actions;
export default EditSlice.reducer;