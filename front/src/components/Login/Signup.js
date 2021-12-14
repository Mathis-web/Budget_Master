import './style.scss';
import {Button} from 'semantic-ui-react';
import { Field, PasswordStrength } from '../index';
import PropTypes from 'prop-types';

function Signup({
    onFormSubmit,
    onChangeInput,
    email,
    password,
    confirmPassword,
    isLoading,
    strengthPassword
}) {
    const handleOnFormSubmit = (e) => {
        e.preventDefault();
        onFormSubmit();
    }

    return (
        <div className="connexion">
            <h2 className="connexion__title">Inscription</h2>
            <form className="connexion__form" onSubmit={handleOnFormSubmit} name="signup">
                <Field type="email" placeholder="Email" name="email" value={email} onChangeFunc={onChangeInput}/>
                <Field type="password" placeholder="Mot de passe" name="password" value={password} onChangeFunc={onChangeInput}/>
                <Field type="password" placeholder="Confirmer le mot de passe" name="confirmPassword" value={confirmPassword} onChangeFunc={onChangeInput}/>
                <PasswordStrength strength={strengthPassword} />
                <Button loading={isLoading} disabled={isLoading} color="blue" className="connexion__form__submit">VALIDER</Button>
            </form>
        </div>
    );
}

Signup.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

export default Signup;