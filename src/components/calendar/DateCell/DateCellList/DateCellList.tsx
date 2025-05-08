import DateCellItem from '../DateCellItem/DateCellItem';

interface ListDataItem {
    id: string,
    content: string,
    type: string;
}

const DateCellList = (
    { listData }:
        {
            listData: ListDataItem[]

        }) => {

    return (
        <ul className="events">
            {listData?.map((item) => (
                <li key={item?.id}>
                    <DateCellItem item={item} />
                </li>
            ))}
        </ul>
    )
}

export default DateCellList