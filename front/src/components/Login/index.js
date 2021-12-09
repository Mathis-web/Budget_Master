import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Field } from '../index';
import PropTypes from 'prop-types';
import './style.scss';

function Login({onFormSubmit}) {
    return (
        <section className="connexion">
            <h2 className="connexion__title">Connexion</h2>
            <form className="connexion__form" onSubmit={onFormSubmit}>
                <div className="connexion__form__signup">
                    <p>Pas encore de compte chez nous ?</p>
                    <Link to="/inscription" className="connexion__form__signup__button">C'est par ici !</Link>
                </div>
                <Field type="email" placeholder="Email" name="email" />
                <Field type="email" placeholder="Mot de passe" name="password" />
                <Button loading color="blue">VALIDER</Button>
            </form>
        </section>
        
    );
};

Login.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}

export default Login;