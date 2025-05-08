import InputEvent from "../InputEvent/InputEvent";
import CreateEventFormProps from "@src/interfaces/components/create-event/create-event-form";
import TimePickerEvent from "../TimePicker/TimePicker";
import LabelWrapper from "@src/components/ui/LabelWrapper/LabelWrapper";
import { Fragment } from "react/jsx-runtime";
import Btn from "@src/components/ui/Btn/Btn";
import { selectLangsData } from "@src/selectors/selectors";
import { useSelector } from "react-redux";

const CreateOrEditEventForm = ({ ...props }: CreateEventFormProps) => {

    const { onCreateNewEvent, listDataTimePickerEvent } = props;

     const langsData = useSelector(selectLangsData);

    return (
        <form className="m-auto max-w-2xl border-2 border-blue-500 p-10 rounded-2xl shadow-2xl" onSubmit={onCreateNewEvent}>
            <LabelWrapper text={langsData.lang === 'ru' ? 'Ваше событие:' : 'Your event:'}>
                <InputEvent name='eventText' placeholder={langsData.lang === 'ru' ? 'Новая событие' : 'A new event:'} {...props} />
            </LabelWrapper>
            {listDataTimePickerEvent.map(item => (
                <Fragment key={item.id}>
                    <LabelWrapper text={item.text}>
                        <TimePickerEvent {...item} {...props} />
                    </LabelWrapper>
                </Fragment>
            ))}
            <div className="flex justify-end">
                <Btn actionWithDateEvent={false} type='submit' text='Ok' />
            </div>
        </form>
    )
}

export default CreateOrEditEventForm