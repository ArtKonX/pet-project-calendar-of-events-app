import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { AddDatePayloadAction, DateSliceInitialState } from "@src/interfaces/redux/slices";

const initialState = {
    date: ''
} as DateSliceInitialState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const DateSlice = createSliceWithThunk({
    name: "dateData",
    initialState,
    selectors: {
        dateData: (state) => state,
    },
    reducers: (create) => ({
        addDate: create.reducer((state, action: PayloadAction<AddDatePayloadAction>) => {
            const { date } = action.payload;
            state.date = date;
        }),
        removeDate: create.reducer((state) => {
            state.date = '';
        })
    }),
});

export default DateSlice.reducer;

const persistConfig = {
    key: 'dateData',
    storage,
    whitelist: ['dateData'],
};

const persistedReducer = persistReducer(persistConfig, DateSlice.reducer);

export const { addDate, removeDate } = DateSlice.actions;
export const reducer = persistedReducer;