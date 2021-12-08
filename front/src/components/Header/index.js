import './style.scss';

function Header() {
    return (
        <header className="header">
            <div className="header__left-container">
                <span className="header__logo">$</span>
                <h1 className="header__title">Budget Master</h1>
            </div>
            <div className="header__right-container">
                <nav>
                    <ul className="header__nav">
                        <li className="header__nav__li">Se connecter / S'incrire</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;