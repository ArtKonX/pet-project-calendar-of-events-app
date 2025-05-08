import { ListEventsDate } from "@src/components/date-events";
import Layout from "@src/components/Layout/Layout";
import Btn from "@src/components/ui/Btn/Btn";
import HeadingWithContent from "@src/components/ui/HeadingWithContent/HeadingWithContent"
import { useSelector } from "@src/hooks/useTypedSelector";
import { addDate } from "@src/redux/slices/dateSlice";
import { findCurrentEventsDate } from "@src/redux/slices/currentDateSlice";
import { selectCurrentDateEvents, selectEventsData, selectLangsData } from "@src/selectors/selectors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import EmptyState from "@src/components/date-events/EmptyState/EmptyState";

import eventsBtnsData from '@data/events/events-btns-data.json';

import headers from '@data/headers/headers.json';

const DateEventsPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const langsData = useSelector(selectLangsData);

    const dispatch = useDispatch();
    const events = useSelector(selectEventsData);
    const currentDateEvents = useSelector(selectCurrentDateEvents)

    useEffect(() => {

        dispatch(findCurrentEventsDate({ id, eventsData: events.eventsData }))
    }, []);

    const onCreate = () => {
        const date = currentDateEvents.currentDateEvents.date;
        dispatch(addDate({ date }));
        navigate('/create-event')
    }

    return (
        <Layout>
            <HeadingWithContent titleHeading={
                `${headers[langsData.lang].headers.events}${langsData.lang === 'ru' ?
                    currentDateEvents.currentDateEvents?.date?.split('-')?.reverse()?.join('-') :
                    currentDateEvents.currentDateEvents?.date}`}
            >
                <div className="mb-5 text-end">
                    <Btn actionWithDateEvent={false} type='button' text={eventsBtnsData[langsData.lang].add} onClick={onCreate} />
                </div>
                {currentDateEvents.currentDateEvents.events?.length > 0 ?
                    <ListEventsDate date={currentDateEvents.currentDateEvents.date}
                        listEventsDateData={currentDateEvents.currentDateEvents.events} /> :
                    <EmptyState text='На эту дату у Вас нет событий. Создайте их!' />}
            </HeadingWithContent>
        </Layout>
    )
}

export default DateEventsPage