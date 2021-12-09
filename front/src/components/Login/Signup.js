import './style.scss';
import {Button} from 'semantic-ui-react';
import {Field} from '../index';
import PropTypes from 'prop-types';

function Signup({onFormSubmit}) {
    return (
        <div className="connexion">
            <h2 className="connexion__title">Inscription</h2>
            <form className="connexion__form">
                <Field type="email" placeholder="Email" name="email" />
                <Field type="email" placeholder="Mot de passe" name="password" />
                <Field type="email" placeholder="Confirmer le mot de passe" name="confirm-password" />
                <Button loading={false} color="blue" className="connexion__form__submit">VALIDER</Button>
            </form>
        </div>
    );
}

Signup.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}

export default Signup;