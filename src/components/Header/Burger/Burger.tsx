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
        <button className="ml-3 xs:block lg:hidden cursor-pointer text-6xl mb-2" onClick={onActionMenu}>≡</button>
    )
}

export default Burger