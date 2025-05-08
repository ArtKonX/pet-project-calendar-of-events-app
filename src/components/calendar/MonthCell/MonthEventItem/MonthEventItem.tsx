import { Badge } from 'antd';

const MonthEventItem = ({ content }: { content: string }) => {
    return (
        <Badge status='processing' text={content} />
    );
};

export default MonthEventItem