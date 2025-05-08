import { Dayjs } from 'dayjs';

interface EventItem {
    id: string,
    type: string,
    content: string,
    to: string,
    date: string,
    from: string,
    remindTime: string
    eventStartDate?: Dayjs
}

export interface EditSliceInitialState {
    currentEditEvent: EventItem | null
}

interface CurrentDateEvents {
    date: string,
    events: EventItem[]
}

export interface FindCurrentEditEventPayloadAction {
    id: string
    currentDateEvents: CurrentDateEvents
}