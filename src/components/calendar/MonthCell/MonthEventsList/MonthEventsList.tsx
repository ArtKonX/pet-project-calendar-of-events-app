import MonthEventItem from "../MonthEventItem/MonthEventItem";

interface MonthEventsListProps {
    events: string[],
    title: string
}

const MonthEventsList = ({ events, title }: MonthEventsListProps) => {

    return (
        <div>
            <h4 className='font-bold'>{title}</h4>
            <ul className='flex flex-col'>
                {events.map((event, indx) => (
                    <MonthEventItem key={indx} content={event} />
                ))}
            </ul>
        </div>
    );
}

export default MonthEventsList