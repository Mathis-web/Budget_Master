import './style.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Header, Home, Footer, Login, Signup, Categories, Expenses, RequireAuth } from '../index';

import authService from '../../services/authService';
import dataService from '../../services/dataService';
import validator from '../../helpers/validator';
import handleError from '../../services/handleError';

function App() {
  const userInputInitialState = {
    login:{
      email: "",
      password: "",
    },
    signup: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  }
  const [userInput, setUserInput] = useState(userInputInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [strengthPassword, setStrengthPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  let passwordStrengthTimeout;

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if(isAuthenticated) getUserData();
  }, [isAuthenticated])

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const allData = await dataService.getAllUserData();
      const allCategories = await dataService.getAllCategories();
      setExpenses(allData);
      setCategories(allCategories);
    } catch (error) {
      handleError('Une erreur est survenue lors de la récupération de vos données. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
};

  const checkLoginStatus = async () => {
    try {
      const response = await authService.checkIfLoggedIn();
      setIsAuthenticated(response.data);
      if(response.data) navigate('/mesdepenses');
    } catch (error) {
      console.log(error);
    }
  }

  const resetDefaultValues = () => {
    setUserInput(userInputInitialState);
    setStrengthPassword('');
    setIsLoading(false);
  }

  const handleLogout = async () => {
    try {
      const result = await authService.logout();
      toast.success(result);
      setIsAuthenticated(false);
      return navigate('/');
    } catch (error) {
      handleError();
    }
  }

  const onChangeInput = (name, value, form) => {
    setUserInput({
      ...userInput,
      [form]: {
        ...userInput[form],
        [name]: value
      }
    });
    if(name === 'password' && form === 'signup') checkPasswordStrength();
  }

  const checkPasswordStrength = () => {
    clearTimeout(passwordStrengthTimeout);
    passwordStrengthTimeout = setTimeout(() => {
      const strength = validator.strengthPassword(userInput.signup.password);
      setStrengthPassword(strength);
    }, 500)
  }

  const onLoginFormSubmit = () => {
    setIsLoading(true);
    authService.login(userInput.login.email, userInput.login.password)
    .then(res => {
      setIsAuthenticated(true);
      toast.success('Vous êtes connecté.');
      setIsLoading(true);
      navigate('/mesdepenses');
    })
    .catch(err => {
      if(err.response && err.response.data) toast.error(err.response.data)
      else handleError()
    })
    .finally(() => {
      resetDefaultValues();
    });
  }

  const onSignupFormSubmit = () => {
    setIsLoading(true)
    const isEmailValid = validator.email(userInput.signup.email);
    const arePasswordsEqual = validator.bothPassword(userInput.signup.password, userInput.signup.confirmPassword);
    if(!isEmailValid) {
      handleError('Format d\'email non valide.')
      setIsLoading(false);  
      return;
    }
    if(!arePasswordsEqual) {
      handleError('Les mots de passes sont diffférents.')
      setIsLoading(false);  
      return;
    }
    authService.register(userInput.signup.email, userInput.signup.password)
    .then(res => {
      toast.success('Inscription effectuée. Vous pouvez vous connecter.')
      setTimeout(() => navigate('/connexion', {replace: true}), 2000)

    })
    .catch(err => {
      if(err.response && err.response.data) toast.error(err.response.data)
      else handleError();
    })
    .finally(() => {
      resetDefaultValues();
    });
  }

  return (
    <div className="app">
      <Header isAuthenticated={isAuthenticated} onClickLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={
            <Login 
              onFormSubmit={onLoginFormSubmit}
              onChangeInput={onChangeInput}
              email={userInput.login.email}
              password={userInput.login.password}
              isLoading={isLoading}
              />
          } />
        <Route path="/inscription" element={
          <Signup
            onFormSubmit={onSignupFormSubmit}
            onChangeInput={onChangeInput}
            email={userInput.signup.email}
            password={userInput.signup.password}
            confirmPassword={userInput.signup.confirmPassword}
            isLoading={isLoading}
            strengthPassword={strengthPassword}
           />      
          } />
          <Route path="/mesdepenses" element={
            <RequireAuth isAuthenticated={isAuthenticated}>
              <Categories
                categories={categories}
                isLoading={isLoading}
                getUserData={getUserData}
             />
            </RequireAuth>
          }/>

          <Route path="/mesdepenses/:slug" element={
            <RequireAuth isAuthenticated={isAuthenticated} >
              <Expenses 
                expenses={expenses}
                getUserData={getUserData}
                isLoading={isLoading}
                categories={categories}
              />
            </RequireAuth>
          } />
            
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
