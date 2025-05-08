export interface LangsSliceInitialState {
    lang: string,
    changesLangArray: string[]
}


export interface SelectLangPayloadAction {
    lang: string
}