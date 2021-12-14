import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'semantic-ui-css/semantic.min.css';
import './styles/reset.css';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.min.css';

import App from './components/App';


ReactDOM.render(
  <Router>
    <App />
    <ToastContainer />
  </Router>,
  document.getElementById('root')
);


