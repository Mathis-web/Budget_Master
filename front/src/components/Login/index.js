import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Field } from '../index';
import PropTypes from 'prop-types';
import './style.scss';

function Login({onFormSubmit, onChangeInput, email, password, isLoading}) {
    const handleOnFormSubmit = (e) => {
        e.preventDefault();
        onFormSubmit();
    }

    return (
        <section className="connexion">
            <h2 className="connexion__title">Connexion</h2>
            <form className="connexion__form" onSubmit={handleOnFormSubmit} name="login">
                <Field type="email" placeholder="Email" name="email" value={email} onChangeFunc={onChangeInput} />
                <Field type="password" placeholder="Mot de passe" name="password" value={password} onChangeFunc={onChangeInput} />
                <Button loading={isLoading} disabled={isLoading} color="blue">VALIDER</Button>
                <div className="connexion__form__signup">
                    <p>Pas encore de compte chez nous ?</p>
                    <Link to="/inscription" className="connexion__form__signup__button">C'est par ici !</Link>
                </div>
            </form>
        </section>
        
    );
};

Login.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default Login;