import { TabData } from '@interfaces/components/header';
import { MenuElem } from './MenuElem/MenuElem';

const Menu = (
    { tabsData }:
        { tabsData: TabData[] }
) => {

    return (
        <div className={`lg:border-l-4 lg:border-gray-200 xs:justify-start xs:p-0 xs:m-0 xs:border-l-none h-20 w-full flex lg:flex-row justify-center items-center ml-10 lg:ml-10`}>
            <ul className="xs:flex-col flex lg:flex-row xs:items-start justify-around w-full xs:text-start">
                {tabsData?.map(tab => (
                    <li className="xs:mb-10 lg:mb-0" key={tab.id}>
                        <MenuElem tab={tab} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Menu