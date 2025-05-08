import { Dayjs } from 'dayjs';

interface CurrentDateEvents {
    date: string,
    events: EventItem[]
}

export interface CurrentDateSliceInitialState {
    currentDateEvents: CurrentDateEvents
}

export interface FindCurrentEventsDatePayloadAction {
    id: string,
    eventsData: EventObj
}

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

interface EventObj {
    [key: string]: EventItem[]
}

export interface RemoveInEventsDataPayloadAction {
    id: string,
    date?: string
}