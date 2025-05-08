import { Link } from "react-router-dom"

export const Logo = () => {

    return (
        <Link to='/'
            className="xs:text-5xl cursor-pointer lg:text-4xl p-3 border-2 border-solid
        border-white rounded-2xl
        font-bold hover:shadow-md hover:animate-pulse shadow-white transition-shadow duration-500">
            <span className="text-gray-200">Remind</span>
            <span className="text-blue-1000">App</span>
        </Link>
    )
}