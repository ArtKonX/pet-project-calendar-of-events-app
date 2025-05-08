import ItemEventDate from "../ItemEventDate/ItemEventDate";
import { ListEventsDateProps } from "@interfaces/components/date-events";

export const ListEventsDate = ({ ...props }: ListEventsDateProps) => {

    const { listEventsDateData, date } = props;

    return (
        <ul>
            {listEventsDateData.map(event => (
                <li key={event.id}>
                    <ItemEventDate date={date} {...event} />
                </li>
            ))}
        </ul>
    )
}