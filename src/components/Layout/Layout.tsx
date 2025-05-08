import { ReactNode, useEffect, useState } from "react"
import { Header } from "../Header"
import { Footer } from "../Footer"

import { motion } from 'framer-motion';
import { useSelector } from "@src/hooks/useTypedSelector";
import { selectLangsData } from "@src/selectors/selectors";

const Layout = ({ children }: { children: ReactNode }) => {

    const [pageAppearance, setPageAppearance] = useState('start');
    const langsData = useSelector(selectLangsData);

    useEffect(() => {

        setTimeout(() => {
            setPageAppearance('pending')
        }, 0)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setPageAppearance('start')
            setTimeout(() => {
                setPageAppearance('pending')
            }, 500)
        }, 0)

    }, [langsData.changesLangArray.length])

    const variants = {
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
    };

    return (
        <motion.div className="max-w-full h-full"
            variants={variants}
            initial="hidden"
            animate={pageAppearance === 'start' ? "hidden" : pageAppearance === 'pending' ? 'visible' : "hidden"}
            transition={{ duration: 2 }}>
            <div className="w-full h-full flex flex-col">
                <Header />
                {children}
                <Footer />
            </div>
        </motion.div>
    )
}

export default Layout