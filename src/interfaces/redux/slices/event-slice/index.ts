import { EventData } from "@src/interfaces/components/create-event"
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

export interface EventObj {
    [key: string]: EventItem[]
}

export interface EventsSliceInitialState {
    eventsData: EventObj
}

export interface AddInEventsDataPayloadAction {
    eventData: EventData
}