interface DemoInfoMessageProps {
    text: string,
    isError: boolean
}

const DemoInfoMessage = ({ text, isError }: DemoInfoMessageProps) => {

    return (
        <div className='z-100 fixed w-full flex self-center justify-center top-0 pt-5'>
            <div className={`max-w-100 items-center p-3 text-md font-bold flex border-6 rounded-2xl border-solid ${isError ? 'border-red-800 bg-red-200 dark:bg-red-900 dark:border-red-700/80' : 'border-white bg-blue-200 dark:bg-blue-900 dark:border-blue-700/80'}`}>
                <span className={`mr-4 text-2xl dark:text-white ${!isError ? 'text-blue-700' : 'text-red-800'}`}>{!isError ? '✓' : '⊗'}</span>
                <span>{text}</span>
            </div>
        </div>
    )
}

export default DemoInfoMessage