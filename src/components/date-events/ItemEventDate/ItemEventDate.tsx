import { ItemEventDateData } from "@interfaces/components/date-events";
import Btn from "@src/components/ui/Btn/Btn";
import { removeInEventsData } from "@src/redux/slices/eventsSlice";
import { removeInCurrentDateEvents } from '@src/redux/slices/currentDateSlice';
import { removeNotification } from "@src/redux/slices/notificationSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useState } from "react";

import eventsBtnsData from '@data/events/events-btns-data.json';

import { useSelector } from "@src/hooks/useTypedSelector";
import { selectLangsData } from "@src/selectors/selectors";

const ItemEventDate = ({ ...props }: ItemEventDateData) => {

    const { id, from, to, content, date } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const langsData = useSelector(selectLangsData);

    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = () => {
        setIsDeleting(true);

        setTimeout(() => {
            dispatch(removeInEventsData({ id, date }));
            dispatch(removeInCurrentDateEvents({ id }));
            dispatch(removeNotification({ id }));
        }, 500);
    };

    const onGoindToEdit = () => {
        navigate(`/edit/${id}`);
    };

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.div
            className="flex justify-between items-center border-2 border-solid border-blue-500 rounded-2xl p-3 mb-10"
            variants={variants}
            initial="visible"
            animate={isDeleting ? "hidden" : "visible"}
            transition={{ duration: 0.5 }}
        >
            <div className="flex flex-col items-start">
                <h4 className="text-black text-start font-bold text-2xl dark:text-white">
                    {content}
                </h4>
                <div className="max-w-50 flex mt-4 text-lg font-medium">
                    <time className="mr-4">{langsData.lang === 'ru' ? 'От:': 'From'} {from}</time>
                    <time>{langsData.lang === 'ru' ? 'До:': 'Before:'} {to}</time>
                </div>
            </div>
            <div className="xs:text-end">
                <Btn
                    actionWithDateEvent={true}
                    type='button'
                    text={eventsBtnsData[langsData.lang].edit}
                    onClick={onGoindToEdit}
                />
                <Btn
                    actionWithDateEvent={true}
                    type='button'
                    text={eventsBtnsData[langsData.lang].del}
                    onClick={onDelete}
                />
            </div>
        </motion.div>
    );
}

export default ItemEventDate