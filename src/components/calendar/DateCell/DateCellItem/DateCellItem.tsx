import { Badge, BadgeProps } from "antd"

interface DateCellItemData {
    type: string,
    content: string
}

const DateCellItem = ({ item }: { item: DateCellItemData }) => {

    return (
        <Badge status={item?.type as BadgeProps['status']} text={item?.content} />
    )
}

export default DateCellItem