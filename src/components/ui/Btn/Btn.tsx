import { BtnProps } from "@src/interfaces/ui";

const Btn = ({ ...props }: BtnProps) => {

    const { type, text, actionWithDateEvent, onClick } = props;

    const nameClass = actionWithDateEvent ?
        `xs:my-2 text-lg ml-8 text-blue-500 px-3
        font-bold border-2 border-solid
        border-blue-500 rounded-2xl
        cursor-pointer p-1.5 hover:bg-blue-500 hover:text-white transition-bg
        duration-800` :
        `p-3 font-bold text-xl
        dark:text-white
        border-2 border-solid
        border-blue-500 rounded-2xl
        cursor-pointer hover:bg-blue-500
        dark:hover:bg-blue-900
        hover:text-white transition-bg
        duration-800`

    return (
        <button className={nameClass} type={type} onClick={onClick ? onClick : () => { }}>
            {text}
        </button>
    )
}

export default Btn