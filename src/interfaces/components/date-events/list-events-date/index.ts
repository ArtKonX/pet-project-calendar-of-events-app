export interface ItemEventDateData {
    id: string,
    from: string,
    to: string,
    content: string,
    date: string
}

export interface ListEventsDateProps {
    listEventsDateData: ItemEventDateData[],
    date: string
}