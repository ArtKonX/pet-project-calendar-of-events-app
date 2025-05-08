import { InputEventProps } from "@src/interfaces/components/create-event"
import { ChangeEvent } from "react"


const InputEvent = ({ ...props }: InputEventProps) => {

    const { name, placeholder, eventData, setEventData } = props;

    const onChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setEventData({ ...eventData, [name]: value })
    }

    return (
        <input className="mt-6 p-3 font-sans
        text-xl
        border border-solid
        border-gray-400/40 rounded-2xl
        font-normal bg-white text-black"
            required onChange={onChangeEvent}
            name={name}
            type="text"
            placeholder={placeholder} value={eventData[name]} />
    )
}

export default InputEvent