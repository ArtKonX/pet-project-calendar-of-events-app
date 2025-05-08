import { EventData } from "../event-data"

export interface InputEventProps {
    name: string,
    placeholder: string
    eventData: EventData,
    setEventData: (eventData: EventData) => void
}