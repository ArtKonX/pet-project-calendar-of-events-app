interface CloseBtnProps {
    handleCloseMenu: () => void,
    text: string
}

const CloseBtn = ({ handleCloseMenu, text }: CloseBtnProps) => {

    return (
        <button onClick={handleCloseMenu} className="hover:opacity-50 cursor-pointer text-2xl transition-all duration-300 text-red-800 border-3 px-2 rounded-2xl font-bold">{text}</button>
    )
}

export default CloseBtn