import './style.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Header, Home, Footer, Login, Signup, Message } from '../index';

import authService from '../../services/authService';
import validator from '../../helpers/validator';
import { toast } from 'react-toastify';
// import {MessageError, MessageSuccess} from "../../helpers/message";

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
  // const [message, setMessage] = useState({});
  const [strengthPassword, setStrengthPassword] = useState('');
  // const [userInfos, setUserInfos] = useState({});

  const navigate = useNavigate();
  let passwordStrengthTimeout;

  // const messageAnimationEnd = () => {
  //   setMessage({});
  // }

  const resetDefaultValues = () => {
    setUserInput(userInputInitialState);
    setStrengthPassword('');
    setIsLoading(false);
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
      console.log(res);
      // setMessage(new MessageSuccess('Vous êtes connecté.'))
      toast.success('Vous êtes connecté.')
    })
    .catch(err => {
      // if(err.response && err.response.data) setMessage(new MessageError(err.response.data));
      if(err.response && err.response.data) toast.error(err.response.data)
      // else setMessage(new MessageError('Une erreur s\'est produite.'));
      else toast.error('Une erreur s\'est produite.')
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
      // setMessage(new MessageError('Format d\'email non valide.'));
      toast.error('Format d\'email non valide.')
      setIsLoading(false);  
      return;
    }
    if(!arePasswordsEqual) {
      // setMessage(new MessageError('Les mots de passes sont différents.'));
      toast.error('Les mots de passes sont diffférents.')
      setIsLoading(false);  
      return;
    }
    authService.register(userInput.signup.email, userInput.signup.password)
    .then(res => {
      // setMessage(new MessageSuccess('Inscription effectuée. Vous pouvez vous connecter.'));
      toast.success('Inscription effectuée. Vous pouvez vous connecter.')
      navigate('/connexion', {replace: true});

    })
    .catch(err => {
      // if(err.response && err.response.data) setMessage(new MessageError(err.response.data));
      if(err.response && err.response.data) toast.error(err.response.data)
      // else setMessage(new MessageError('Une erreur s\'est produite.'));
      else toast.error('Une erreur s\'est produite.')
    })
    .finally(() => {
      resetDefaultValues();
    });
  }

  return (
    <div className="app">
      <Header />
      {/* <Message {...message} endAnimationFunc={messageAnimationEnd} /> */}
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
