import { FormEvent } from "react";
import { EventData } from "../event-data";

interface ListDataTimePickerEvent {
    id: number,
    text: string,
    name: string,
    defaultValue: string
}

export default interface CreateEventFormProps {
    eventData: EventData,
    setEventData: (eventData: EventData) => void,
    onCreateNewEvent: (e: FormEvent<HTMLFormElement>) => void,
    listDataTimePickerEvent: ListDataTimePickerEvent[]
}