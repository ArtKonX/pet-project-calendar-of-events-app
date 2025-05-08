import tabsData from '@data/header/tabs-data.json';
import Menu from './Menu/Menu';
import { Logo } from './Logo/Logo';
import Burger from './Burger/Burger';
import { useEffect, useState } from 'react';
import CloseBtn from './CloseBtn/CloseBtn';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SelectLang from './SelectLang/SelectLang';
import { useSelector } from '@src/hooks/useTypedSelector';
import { selectLangsData } from '@src/selectors/selectors';

const listLangs = [
    'ru',
    'en'
]

export const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBurger, setIsBurger] = useState(true);

    const location = useLocation();

    const langsData = useSelector(selectLangsData);

    const variants = !isBurger ? {
        visible: { opacity: 0 },
        hidden: { opacity: 1 }
    } : {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    }

    const handleCloseMenu = () => {
        setIsBurger(true);

        setTimeout(() => {
            setIsMenuOpen(false)
        }, 500)
    }

    useEffect(() => {
        handleCloseMenu();
    }, [location])

    return (
        <header className='bg-blue-500 dark:bg-blue-700 w-full p-3 lg:px-10 xs:px-2 rounded-2xl mt-4'>
            <nav className='flex justify-between items-center'>
                <Logo />
                <div className='xs:hidden lg:flex lg:items-center lg:w-full'>
                    <Menu tabsData={tabsData[langsData.lang]?.menu} />
                    <SelectLang listLangs={listLangs} />
                </div>
                <div className='lg:hidden xs:flex'>
                    <Burger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} setIsBurger={setIsBurger} />
                    <motion.div className={`fixed top-0 left-0 z-50 w-screen h-screen bg-black/70 bg-opacity-90 flex justify-center items-start pt-5 ${isMenuOpen ? 'flex' : 'hidden'}`}
                        variants={variants}
                        initial="hidden"
                        animate={isMenuOpen ? "hidden" : 'visible'}
                        transition={{ duration: 0.6 }}>
                        <div className="bg-blue-300/90 w-11/12 max-h-screen overflow-y-auto rounded-2xl p-6 py-10 flex flex-col gap-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-white text-2xl font-bold mb-5">Меню:</h2>
                                <CloseBtn
                                    handleCloseMenu={handleCloseMenu}
                                    text="x"
                                />
                            </div>
                            <div className='flex'>
                                <Menu
                                    tabsData={tabsData[langsData.lang]?.menu}
                                />
                                <SelectLang listLangs={listLangs} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}