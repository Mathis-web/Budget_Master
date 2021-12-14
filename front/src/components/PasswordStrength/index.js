import './style.scss';
import PropTypes from 'prop-types';

function PasswordStrength({strength}) {
    if(strength === '') return '';
    return (
        <div className="password-strength">
            <p className={`password-strength__text ${strength}`}>
                {strength === 'weak' && 'Sécurité du mot de passe: faible'}
                {strength === 'medium' && 'Sécurité du mot de passe: moyenne'}
                {strength === 'strong' && 'Sécurité du mot de passe: forte'}
            </p>
        </div>
    );
}

PasswordStrength.propTypes = {
    strength: PropTypes.string.isRequired,
}

export default PasswordStrength;