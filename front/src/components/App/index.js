import './style.css';
import { Header, Home, Footer, Login, Signup } from '../index';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Signup />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
