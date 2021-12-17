import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import './style.scss';

function Header({isAuthenticated, onClickLogout}) {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const burgerRef = useRef(null);

    const onClickBurger = () => {
        burgerRef.current.classList.toggle('active');
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    return (
        <>
        <header className="header">
            <div className="header__left-container">
                <Link to="/" className="header__left-container__sitename" style={{textDecoration: "none"}} >
                    {/* <span className="header__logo">$</span> */}
                    <h1 className="header__title">Budget Master</h1>
                </Link>
            </div>
            <div className="header__burger" onClick={onClickBurger} ref={burgerRef}>
                <div className="header__burger__top"></div>
                <div className="header__burger__middle"></div>
                <div className="header__burger__bottom"></div>
            </div>
            <div className="header__right-container">
                <nav className="header__nav">
                    {isAuthenticated
                        ? (<>
                            <Link to="/mesdepenses" className="header__nav__li">Mes dépenses</Link>
                            <p className="header__nav__li" onClick={onClickLogout}>Se déconnecter</p>
                        </>)
                        : <Link to="/connexion" className="header__nav__li">Se connecter</Link>
                    }
                </nav>
            </div>
        </header>

        <div className={isMobileMenuOpen ? 'menu-mobile active' : 'menu-mobile'}>
            <nav className="menu-mobile__nav">
                {isAuthenticated
                    ? (<>
                        <Link to="/mesdepenses" className="menu-mobile__nav__li">Mes dépenses</Link>
                        <p className="menu-mobile__nav__li" onClick={onClickLogout}>Se déconnecter</p>
                    </>)
                    : <Link to="/connexion" className="menu-mobile__nav__li">Se connecter</Link>
                }
            </nav>
        </div>
        </>
    );
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onClickLogout: PropTypes.func.isRequired,
}

export default Header;