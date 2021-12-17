import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

function RequireAuth({isAuthenticated, children}) {
    return (
        isAuthenticated
        ? children
        : <Navigate to="/connexion" replace/>
    );
};

RequireAuth.propTypes= {
    isAuthenticated: PropTypes.bool.isRequired,
};

export default RequireAuth;