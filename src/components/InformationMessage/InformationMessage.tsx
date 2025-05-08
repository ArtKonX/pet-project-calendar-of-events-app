import { Fragment } from "react/jsx-runtime"
import Btn from "../ui/Btn/Btn"
import { FormEvent } from "react"
import { useSelector } from "@src/hooks/useTypedSelector"
import { selectLangsData } from "@src/selectors/selectors"

interface InformationMessageDataItem {
    id: number,
    title: string,
    text: string
}

interface OnAllow {
    (e: FormEvent<HTMLFormElement>): void
}

const InformationMessage = (
    {
        informationMessageData, onAllow, isWarning
    }:
        {
            informationMessageData: InformationMessageDataItem[],
            onAllow: OnAllow,
            isWarning: boolean
        }) => {

    const langsData = useSelector(selectLangsData);

    return (
        <div className="w-full flex justify-center z-100">
            <form onSubmit={onAllow} className={`fixed w-1/2 bottom-0 mb-4 p-6 bg-blue-200/95 dark:bg-gray-600/95 rounded-4xl ${isWarning && 'bg-red-200/95 dark:bg-red-200/95'}`}>
                {informationMessageData.map(item => (
                    <Fragment key={item.id} >
                        <h4 className={`my-4 font-bold text-2xl ${isWarning && 'text-red-700'}`}>{item.title}</h4>
                        <p className={`mb-5 font-medium text-xl ${isWarning && 'text-red-700'}`}>{item.text}</p>
                    </Fragment>
                ))}
                <Btn type='submit' text={langsData.lang === 'ru' ? 'Хорошо' : 'Ok'} actionWithDateEvent={false} />
            </form>
        </div>
    )
}

export default InformationMessage