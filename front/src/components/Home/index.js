import './style.scss';
import Slider from './Slider';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <main className="home">
            <div className="home__description">
                <p className="home__description__text">Avec Budget Master, soyez le maître de votre budget et de vos dépenses. Ayez un suivi précis de vos achats. Essayez dès maintenant en créant un compte.</p>
                <ol className="home__description__list">
                   <li className="home__description__list__step">1. Connectez-vous</li> 
                   <li className="home__description__list__step">2. Créez une ou plusieurs catégories</li> 
                   <li className="home__description__list__step">3. Ajoutez des dépenses dans une catégorie</li> 
                </ol>
                <Link to="/connexion" className="home__link">Je me connecte</Link>
            </div>
            <Slider />
        </main>
    );
};

export default Home;