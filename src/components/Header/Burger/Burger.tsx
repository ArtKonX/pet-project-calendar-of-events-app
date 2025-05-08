interface BurgerProps {
    isMenuOpen: boolean,
    setIsMenuOpen: (isMenu: boolean) => void,
    setIsBurger: (isBurger: boolean) => void,
}

const Burger = ({ isMenuOpen, setIsMenuOpen, setIsBurger }: BurgerProps) => {

    const onActionMenu = () => {
        setIsBurger(false)

        setTimeout(() => {
            setIsMenuOpen(!isMenuOpen)
        }, 500)
    }

    return (
        <button className="ml-5 xs:block lg:hidden cursor-pointer text-7xl mb-2" onClick={onActionMenu}>≡</button>
    )
}

export default Burger