import { EventData } from "../event-data";

export interface TimePickerEventProps {
    name: string,
    eventData: EventData,
    setEventData: (eventData: EventData) => void,
    defaultValue: string
}