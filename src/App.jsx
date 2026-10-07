import './App.css';
import { useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = localStorage.getItem('authData');
    try {
      return storedAuthData ? JSON.parse(storedAuthData) : null;
    } catch {
      localStorage.removeItem('authData');
      return null;
    }
  });

  const handleLogin = (idInstance, apiTokenInstance) => {
    const authDataObject = { idInstance, apiTokenInstance };
    setAuthData(authDataObject);
    localStorage.setItem('authData', JSON.stringify(authDataObject));
  };

  const handleLogout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  return (
    <>
      {authData ? (
        <div>
          Вы вошли
          <button onClick={handleLogout}>Выйти</button>
        </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )
      }
    </>
  )
}

export default App