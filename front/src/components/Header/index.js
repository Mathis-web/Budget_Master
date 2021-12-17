import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.scss';

function Header({isAuthenticated, onClickLogout}) {
    return (
        <header className="header">
            <div className="header__left-container">
                <Link to="/" className="header__left-container__sitename" style={{textDecoration: "none"}} >
                    <span className="header__logo">$</span>
                    <h1 className="header__title">Budget Master</h1>
                </Link>
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
    );
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    onClickLogout: PropTypes.func.isRequired,
}

export default Header;