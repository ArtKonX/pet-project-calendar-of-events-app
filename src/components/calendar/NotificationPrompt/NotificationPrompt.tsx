import InformationMessage from "@src/components/InformationMessage/InformationMessage"
import { FormEvent } from "react";

import informationMessageData from '@data/information-message/information-message-data.json';
import warningInformationMessageData from '@data/information-message/warning-information-message-data.json';
import { useSelector } from "@src/hooks/useTypedSelector";
import { selectLangsData } from "@src/selectors/selectors";

interface NotificationPromptProps {
    isAllowed: boolean,
    onAllow: (e: FormEvent<HTMLFormElement>) => void,
    isWarning: boolean
}

const NotificationPrompt = ({ isAllowed, onAllow, isWarning }: NotificationPromptProps) => {

    const langsData = useSelector(selectLangsData)

    return (
        !isAllowed &&
        <InformationMessage
            informationMessageData={isWarning ? warningInformationMessageData[langsData.lang].data : informationMessageData[langsData.lang].data}
            onAllow={onAllow}
            isWarning={isWarning}
        />
    )
}

export default NotificationPrompt