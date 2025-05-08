import { buildCreateSlice, asyncThunkCreator, PayloadAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { LangsSliceInitialState, SelectLangPayloadAction } from "@interfaces/redux/slices";

const initialState = {
    lang: 'ru',
    changesLangArray: [],
} as LangsSliceInitialState;

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const LangsSlice = createSliceWithThunk({
    name: "langsData",
    initialState,
    selectors: {
        langsData: (state) => state,
    },
    reducers: (create) => ({
        addLang: create.reducer((state, action: PayloadAction<SelectLangPayloadAction>) => {
            const { lang } = action.payload;

            state.lang = lang
        }),
        addInLangs: create.reducer((state, action: PayloadAction<SelectLangPayloadAction>) => {
            const { lang } = action.payload;

            // Добавляет язык в массив языков
            // Массив нужен для плавной анимации при сменя языка
            state.changesLangArray.push(lang);
        }),
        resetLangs: create.reducer((state) => {
            state.changesLangArray = [];
        }),
    }),
});

export default LangsSlice.reducer;

const persistConfig = {
    key: 'langsData',
    storage,
    whitelist: ['langsData'],
};

const persistedReducer = persistReducer(persistConfig, LangsSlice.reducer);

export const { addInLangs, resetLangs, addLang } = LangsSlice.actions;
export const reducer = persistedReducer;