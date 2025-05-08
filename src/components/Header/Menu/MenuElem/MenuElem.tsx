import { TabData } from '@interfaces/components/header'
import { NavLink } from 'react-router-dom'

export const MenuElem = ({ tab }: { tab: TabData }) => {

    return (
        <NavLink
            className={({ isActive }) => isActive ?
                `text-gray-200 font-bold text-2xl p-3 border border-solid border-gray-200 rounded-2xl
                hover:opacity-75 transition-opacity duration-500` :
                `text-blue-1000 font-bold text-2xl p-3 border border-solid border-blue-1000 rounded-2xl
                hover:opacity-75 transition-opacity duration-500`
            }
            to={tab.to}
        >
            {tab.title}
        </NavLink>
    )
}