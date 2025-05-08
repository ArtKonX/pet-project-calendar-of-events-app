import { selectLangsData, selectNotifications } from "@src/selectors/selectors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';
import DemoInfoMessage from "@src/components/DemoInfoMessage/DemoInfoMessage";

interface NotificationsType {
    type: string;
    text?: string
}

const NotificationHandlerMessage = ({ notificationsType }: { notificationsType: NotificationsType }) => {
    const notifications = useSelector(selectNotifications);
    const langsData = useSelector(selectLangsData);

    const [isMessageVisible, setIsMessageVisible] = useState('start');

    const variants = {
        visible: { opacity: 1, y: 20 },
        hidden: { opacity: 0, y: 0 }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsMessageVisible('pending');
            setTimeout(() => {
                setIsMessageVisible('result');
                setTimeout(() => {
                    setIsMessageVisible('final');
                }, 1700);
            }, 2000);
        }, 1500);
    }, []);

    const renderMessage = () => {
        if (isMessageVisible !== 'final') {
            if (notificationsType.type === 'notification') {
                if (!notifications.isNotAllow || notifications.countNotAllow === 1) {
                    return (
                        <motion.div
                            className='fixed w-full self-center top-0'
                            variants={variants}
                            initial="hidden"
                            animate={isMessageVisible === 'start' ? "hidden" : isMessageVisible === 'pending' ? 'visible' : "hidden"}
                            transition={{ duration: 2 }}
                        >
                            <DemoInfoMessage isError={true} text={langsData.lang === 'ru' ? "У Вас запрещены уведомления!" : "Your notifications are prohibited!"} />
                        </motion.div>
                    );
                }

                if (notifications.isNotAllow) {
                    return (
                        <motion.div
                            className='fixed w-full self-center top-0'
                            variants={variants}
                            initial="hidden"
                            animate={isMessageVisible === 'start' ? "hidden" : isMessageVisible === 'pending' ? 'visible' : "hidden"}
                            transition={{ duration: 2 }}
                        >
                            <DemoInfoMessage isError={false} text={langsData.lang === 'ru' ? "У Вас разрешены уведомления!" : "You have notifications enabled!"}/>
                        </motion.div>
                    );
                }
            }

            if (notificationsType.type === 'message') {
                return (
                    <motion.div
                        className='fixed w-full self-center top-0 z-200'
                        variants={variants}
                        initial="hidden"
                        animate={isMessageVisible === 'start' ? "hidden" : isMessageVisible === 'pending' ? 'visible' : "hidden"}
                        transition={{ duration: 2 }}
                    >
                        <DemoInfoMessage isError={false} text={notificationsType.text} />
                    </motion.div>
                );
            }
        }
        return null;
    };

    return renderMessage();
};

export default NotificationHandlerMessage;