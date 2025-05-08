import { useSelector } from "@src/hooks/useTypedSelector";
import { selectEventsData } from "@src/selectors/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import dayjs from 'dayjs';
import { changeTypesEvents } from "@src/redux/slices/eventsSlice";

const EventDataHandler = () => {
    const eventsData = useSelector(selectEventsData);
    const dispatch = useDispatch();

    useEffect(() => {
        const nowDate = dayjs().subtract(1, 'day');
        const eventsArray = Object.entries(eventsData.eventsData);
        const eventsArrayFiltered = eventsArray.filter(([date]) => nowDate.isAfter(dayjs(date)));

        if (eventsArrayFiltered.length > 0) {
            eventsArrayFiltered.forEach(([date]) => {
                dispatch(changeTypesEvents({ date: date }));
            });
        }
    }, [eventsData]);

    return null;
};

export default EventDataHandler;